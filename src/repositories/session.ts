import { query } from "../db/db.js";
import { Session, SessionModel } from "../models/session.js";

export class SessionRepository {
  async findByToken(token: string): Promise<SessionModel | null> {
    const [result] = await query("SELECT * FROM `sessions` WHERE `token` = ?", [
      token,
    ]);

    if (Array.isArray(result) && result.length > 0) {
      const session = new SessionModel(result[0] as Session);
      return session;
    }

    return null;
  }
}
