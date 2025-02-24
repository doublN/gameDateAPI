import { query } from "../db/db.js";
import { Cover } from "../models/cover.js";

export class CoverService {
  async addCoverToDB(cover: Cover) {
    await query(`INSERT IGNORE INTO covers (id, url) VALUES (?, ?)`, [
      cover.id,
      cover.url,
    ]);
  }
}
