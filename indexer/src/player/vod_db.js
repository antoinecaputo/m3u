import {getDb} from "../db.js";

/**
 * Get VOD categories from DB
 * @param includeIgnored {boolean}
 * @returns {Promise<{category_id: number, category_name: string, parent_id: number, ignored: boolean}[]>}
 */
export async function getCategories(includeIgnored = false) {
  const db = await getDb();

  return new Promise(async (resolve, reject) => {
    await db.all('SELECT * FROM vod_categories', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.filter(category => includeIgnored || !category.ignored));
      }
    });
  });
}


/**
 * Write VOD categories to DB
 * @param categories {{category_id: number, category_name: string, parent_id: number, ignored: boolean}[]}
 * @returns {Promise<number>}
 */
export async function writeCategories(categories) {
  const db = await getDb();

  let success = 0;

  const stmt = await db.prepare('INSERT INTO vod_categories VALUES (?, ?, ?, ?)');
  for (const category of categories) {
    await new Promise((resolve, reject) => {
      stmt.run(category.category_id, category.category_name, category.parent_id, category.ignored, function (err) {
        if (!err) {
          success++;
        }
        resolve();
      });
    });
  }
  stmt.finalize();

  return success;
}

/**
 * Set VOD category as ignored or not
 * @param categoryId
 * @param ignored
 */
export async function setCategoryIgnored(categoryId, ignored) {
  const db = await getDb();
  await db.run('UPDATE vod_categories SET ignored = ? WHERE category_id = ?', ignored, categoryId);
}


/**
 * Write VOD streams to DB
 * @param streams {{stream_id: number, tmdbId: string, name: string, rating: number, added: number, category_id: number, container_extension: string}[]}
 * @returns {Promise<number>}
 */
export async function writeStreams(streams) {
  const db = await getDb();

  let success = 0;

  const stmt = await db.prepare('INSERT INTO vod_streams VALUES (?, ?, ?, ?, ?, ?, ?)');
  for (const stream of streams) {
    await new Promise((resolve, reject) => {
      stmt.run(stream.stream_id, stream.tmdbId, stream.name, stream.rating, stream.added, stream.category_id, stream.container_extension, function (err) {
        if (!err) {
          success++;
        }
        resolve();
      });
    });
  }

  stmt.finalize();

  return success;
}

