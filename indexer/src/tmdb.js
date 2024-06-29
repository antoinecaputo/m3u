import {JSDOM} from 'jsdom';
import {getDb} from "./db.js";

/**
 * Run the indexation of the tmdb table
 * @param limit {number}
 * @param delay {{min: number, max: number}} - Random delay in ms between tmdb web requests
 * @returns {Promise<void>}
 */
export async function runIndexation(limit = 0, delay = {
  min: 1000,
  max: 2000
}) {
  console.log('Getting not indexed streams');
  const notIndexedTmdbIds = await getNotIndexedTmdbStreamIds();
  console.log(`   = OK (${notIndexedTmdbIds.length} results)`);

  for await (const id of notIndexedTmdbIds.slice(0, limit || notIndexedTmdbIds.length)) {
    console.log(`Indexing ${id} (${notIndexedTmdbIds.indexOf(id) + 1}/${notIndexedTmdbIds.length})`);
    const {title, description, image, releaseDate, runtime} = await getMovieSheet(id);
    await writeTmdbSheet({tmdbId: id, title, description, image, releaseDate, runtime});
    console.log(`   = OK`);

    const waitFor = Math.floor(Math.random() * (delay.max - delay.min) + delay.min);
    console.log(`⏳ Waiting ${waitFor}ms`);
    await new Promise(resolve => setTimeout(resolve, waitFor));
  }
}

/**
 * Get all tmdb stream ids that are not indexed
 * @returns {Promise<string[]>}
 */
async function getNotIndexedTmdbStreamIds() {
  const db = await getDb();

  //  SELECT DISTINCT tmdbId FROM vod_streams WHERE tmdbId NOT IN (SELECT tmdbId FROM tmdb)
  // ORDER BY added DESC
  return new Promise(async (resolve, reject) => {
    await db.all('SELECT DISTINCT tmdbId FROM vod_streams WHERE tmdbId NOT IN (SELECT tmdbId FROM tmdb) ORDER BY added DESC', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.map(row => row.tmdbId));
      }
    });
  });
}

/**
 * Write an indexed stream to the tmdb table
 * @param sheet {{tmdbId: string, title: string, description: string, image: string, releaseDate: string, runtime: string}}
 * @returns {Promise<void>}
 */
async function writeTmdbSheet(sheet) {
  const db = await getDb();

  const stmt = await db.prepare('INSERT INTO tmdb VALUES (?, ?, ?, ?, ?, ?, ?)');
  await new Promise((resolve, reject) => {
    stmt.run(sheet.tmdbId, sheet.title, sheet.description, sheet.image, sheet.releaseDate, sheet.runtime, Date.now(), function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
  stmt.finalize();
}

const url = "https://www.themoviedb.org/movie/"

export async function getMovieSheet(tmdbId) {
  const response = await fetch(`${url}${tmdbId}`);
  const body = await response.text();

  const dom = new JSDOM(body);

  const ogTitle = dom.window.document.querySelector('meta[property="og:title"]');
  const title = ogTitle ? ogTitle.content : '';

  const ogDescription = dom.window.document.querySelector('meta[property="og:description"]');
  const description = ogDescription ? ogDescription.content : '';

  const ogImage = dom.window.document.querySelector('meta[property="og:image"]');
  const image = ogImage ? ogImage.content : '';

  const release = dom.window.document.querySelector('span.release');
  const dateRegex = /(\d{2}\/\d{2}\/\d{4})/;
  const releaseDate = release?.textContent.match(dateRegex)[1] ?? '';

  const runtimeSpan = dom.window.document.querySelector('span.runtime');
  const runtime = runtimeSpan?.textContent.trim() ?? '';

  const genresSpan = dom.window.document.querySelector('span.genres');
  const genres = genresSpan?.textContent.split(',').map(genre => genre.trim()) ?? [];

  const people = dom.window.document.querySelectorAll('ol.people.scroller li.card');
  const cast = Array.from(people).map(person => {
    const name = person.querySelector('img.profile')?.alt ?? '';
    const image = person.querySelector('img.profile')?.src ?? '';
    const character = person.querySelector('p.character')?.textContent ?? '';
    return {name, character, image};
  });

  return {title, description, image, releaseDate, runtime, genres, cast};
}

async function getCast(tmdbId) {
  const response = await fetch(`${url}${tmdbId}/cast`);
  const text = await response.text();
  console.log(text);

  // Define the regex to capture the person names
  const castRegex = /\/person\/\d+-([\w-]+)/g;
  let castMatches;
  const cast = [];

  // Use regex to find all matches in the input string
  while ((castMatches = castRegex.exec(text)) !== null) {
    const person = castMatches[1].split('-').join(' ');
    if (!cast.includes(person)) {
      cast.push(person);
    }
  }

  console.log('   Cast = ', cast);

  return cast;
}