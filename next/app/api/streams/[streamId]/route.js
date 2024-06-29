import {buildStreamObject, db} from "@/services/db";

export async function GET(request,  params) {
  const {streamId} = params.params;
  if (!streamId) {
    return Response.json({error: 'Bad request'}, {status: 400});
  }

  console.log('streamId', streamId);


  try {
    const stream = await new Promise((resolve, reject) => {
      db.get(`
                  SELECT stream.stream_id,
                         stream.container_extension,
                         stream.tmdbId,
                         t.title,
                         t.description
                  FROM vod_streams AS stream
                    INNER JOIN main.tmdb t on stream.tmdbId = t.tmdbId
                  WHERE stream.stream_id = ?;`, [streamId], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(buildStreamObject(row));
      });
    });

    return Response.json(stream);
  } catch (e) {
    return Response.json({error: e.message}, {status: 500});
  }
}