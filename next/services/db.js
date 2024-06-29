import sqlite3 from "sqlite3";
import {getStreamUrl} from "@/services/player";

export const db = new sqlite3.Database('vod.db');

/**
 * Build a stream object from a row
 * @param row
 * @returns {{
 * stream_id: number,
 * tmdbId: string,
 * title: string,
 * description: string,
 * container_extension: string
 * }}
 */
export function buildStreamObject(row) {
  return {
    stream_id: row.stream_id,
    tmdbId: row.tmdbId,
    title: row.title ?? row.name,
    description: row.description,
    image: row.image ?? '',
    releaseDate: row.releaseDate ?? '',
    runtime: row.runtime ?? '',
    rating: row.rating ?? NaN,
    added: row.added ?? NaN,
    category_name: row.category_name ?? '',
    container_extension: row.container_extension ?? '',
    url: getStreamUrl(row.stream_id, row.container_extension)
  };
}