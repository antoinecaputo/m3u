import { db} from "@/services/db";

export async function GET(request) {
  try {
    /**
     * @type {{category_id: number, category_name: string, parent_id: number, ignored: boolean}[]}
     */
    const categories = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM vod_categories ORDER BY ignored, category_name;`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    return Response.json(categories);
  } catch (e) {
    return Response.json({error: e.message}, {status: 500});
  }
}