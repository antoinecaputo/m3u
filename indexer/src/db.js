import sqlite3 from "sqlite3";

let db = null;

async function init() {
  db = new sqlite3.Database('vod.db');

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS vod_categories (category_id INTEGER PRIMARY KEY, category_name TEXT, parent_id INTEGER, ignored BOOLEAN)');
      db.run('CREATE TABLE IF NOT EXISTS vod_streams (stream_id INTEGER PPRIMARY KEY, tmdbId TEXT, name TEXT, rating INTEGER, added INTEGER, category_id INTEGER, container_extension TEXT)');
      db.run('CREATE TABLE IF NOT EXISTS tmdb (tmdbId INTEGER PRIMARY KEY, title TEXT, description TEXT, image TEXT, releaseDate TEXT, runtime TEXT, INDEXED INTEGER)');
      resolve();
    });
  });
}

/**
 * Get the database instance
 * @returns {Promise<sqlite3.Database>}
 */
export async function getDb() {
  if (!db) {
    console.log('* Database not initialized');
    await init();
    console.log('*   = Database initialized');
  }

  return db;
}