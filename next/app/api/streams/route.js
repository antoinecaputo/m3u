import {buildStreamObject, db} from "@/services/db";

export async function GET(request) {
  try {
    const streams = await new Promise((resolve, reject) => {
      db.all(`
          SELECT stream.stream_id,
                 stream.tmdbId,
                 stream.name,
                 stream.rating,
                 stream.added,
                 stream.category_id,
                 stream.container_extension,
                 t.title,
                 t.description,
                 t.image,
                 t.releaseDate,
                 t.runtime,
                 c.category_name
          FROM vod_streams AS stream
                   INNER JOIN main.tmdb t on stream.tmdbId = t.tmdbId
                   INNER JOIN vod_categories AS c ON stream.category_id = c.category_id
          ORDER BY stream.added DESC, stream.rating DESC
          LIMIT 100;`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows.map(row => buildStreamObject(row)));
      });
    });

    return Response.json(streams);
  } catch (e) {
    return Response.json({error: e.message}, {status: 500});
  }
}

