import * as db from "./src/db.js";
import * as vod_api from "./src/player/vod_api.js";
import * as vod_db from "./src/player/vod_db.js";
import * as tmdb from "./src/tmdb.js";


(async () => {
  // Force init
  await db.getDb();

  await tmdb.runIndexation(0, {min: 10000, max: 30000});

  return;

  console.log('Getting categories from API');
  const vodCategories = await vod_api.getCategories();
  console.log(`   = OK (${vodCategories.length} results)`);

  const transformedCategories = vodCategories.map(category => ({
    category_id: category.category_id,
    category_name: category.category_name,
    parent_id: category.parent_id,
    ignored: ![
      137,
      440,
      327,
    ].includes(Number(category.category_id))
  }))

  // Transform API categories to DB categories
  console.log('Writing categories to DB');
  let success = await vod_db.writeCategories(transformedCategories);
  console.log(`   = OK (${success}/${transformedCategories.length})`);

  console.log('Getting categories from DB');
  let categories = await vod_db.getCategories();
  console.log(`  = OK (${categories.length} results)`);

  // Test to toggle a category for indexing
  console.log('Toggling category 1076 for indexing');
  await vod_db.setCategoryIgnored(1076, false);
  console.log('   = OK');

  console.log('Getting categories from DB');
  categories = await vod_db.getCategories();
  console.log(`  = OK (${categories.length} results)`);

  for await (const category of categories) {
    // Get categories streams
    console.log('Getting streams for category', category.category_name);
    const streams = await vod_api.getStreams(category.category_id);
    console.log(`   = OK (${streams.length} results)`);

    // transform API streams to DB streams
    const transformedStream = streams.map(stream => ({
      stream_id: stream.stream_id,
      tmdbId: stream.tmdb,
      name: stream.name,
      rating: stream.rating,
      added: stream.added,
      category_id: stream.category_id,
      container_extension: stream.container_extension,
    }))

    // write streams to DB
    console.log('Writing streams to DB');
    success = await vod_db.writeStreams(transformedStream);
    console.log(`   = OK (${success}/${transformedStream.length})`);
  }
})().catch(e => console.error('Error:', e));

// const collections = [
//   "vod",
//   "vod_categories",
// ]
//
// const categoryItem = {
//   type: "vod",
//   category_id: "99",
//   category_name: "TOP KIDS BLURAY (MULTI-SUBS)",
//   ignored: false,
// }
//
// const collectionItem = {
//   title: "Hit Man",
//   description: "Gary Johnson, policier à Houston, est en mission d'infiltration en se faisant passer pour un tueur à gages. Il rencontre alors une femme battue par son petit ami violent. Pour la secourir, il va devoir oublier toutes les procédures.",
//   image: 'https://media.themoviedb.org/t/p/w500/sMt8yePZ0tpKUp5j5dj1cprruAb.jpg',
//   releaseDate: '24/05/2024',
//   runtimeValue: '1h 55m',
//   genresList: [ 'Romance', 'Comédie', 'Crime' ],
//   cast: [
//     {
//       name: 'Glen Powell',
//       character: 'Gary Johnson',
//       image: 'https://media.themoviedb.org/t/p/w138_and_h175_face/zbCsnhaUIzWypReNYV3Hj95WbP9.jpg'
//     },
//     {
//       name: 'Adria Arjona',
//       character: 'Madison Figueroa Masters',
//       image: 'https://media.themoviedb.org/t/p/w138_and_h175_face/2xAwAxrjZrgfyrNYToBIjg1ZeRB.jpg'
//     }
//   ],
//   indexed: "1718142240",
//   legacy: {
//     num: 2,
//     name: "4K-NF - Godzilla Minus One (2023)",
//     stream_type: "movie",
//     stream_id: 860738,
//     stream_icon: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/hRhRQnKHtysjR4Ow7Gw99LV7gfS.jpg",
//     rating: "7.63",
//     rating_5based: 3.8,
//     tmdb: "940721",
//     trailer: "",
//     added: "1718142240",
//     is_adult: 0,
//     category_id: "219",
//     category_ids: [219],
//     container_extension: "mkv",
//     custom_sid: null,
//     direct_source: "",
//   }
// }
//
//

/*
( async () => {
  const lines = [
    '#EXTINF:-1 tvg-id="" tvg-name="TOP - Cash Out (2024)" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/v3youHDLigrtIis1NqTjlY8Sk38.jpg" group-title="TOP MOVIES BLURAY (MULTI-SUBS)",TOP - Cash Out (2024)'
  ]

  const line = lines[0];

  console.log('🧹 Cleaning up result')

  const regex = /tvg-name="([^"]+)"/;
  const nameRaw = line.match(regex) ? line.match(regex)[1] : '';
  if (!nameRaw) {
    console.log('❌ tvg-name not found');
    return;
  }

  const name = nameRaw.split(' - ')[1].split(' (')[0];
  console.log('   Name = ', name);

  const movie = await getMovie(name);

})().catch(console.error)
*/