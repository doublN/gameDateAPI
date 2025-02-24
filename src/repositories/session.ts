import { query } from "../db/db.js";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export type SessionUserJoin = Pick<Session, "userId" | "createdAt"> &
  Pick<User, "email">;

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

  async findByTokenJoin(token: string): Promise<SessionUserJoin | null> {
    const [result] = await query(
      "SELECT sessions.userId, sessions.createdAt, users.email FROM `sessions` INNER JOIN users ON sessions.userId = users.id WHERE `token` = ?",
      [token]
    );

    if (Array.isArray(result) && result.length > 0) {
      return result[0] as SessionUserJoin;
    }

    return null;
  }
}
