import { query } from "../db/db.js";
import { Session } from "../models/session.js";

export class SessionRepository {
  async findByToken(token: string): Promise<Session | null> {
    const [result] = await query("SELECT * FROM `sessions` WHERE `token` = ?", [
      token,
    ]);

    if (Array.isArray(result) && result.length > 0) {
      return result[0] as Session;
    }

    return null;
  }
}
