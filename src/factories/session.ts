import { query } from "../db/db.js";
import { Session } from "../models/session.js";
import { SessionRepository } from "../repositories/session.js";

export class SessionFactory {
  private readonly sessionRepository = new SessionRepository();

  async createSession(userId: number): Promise<Session | null> {
    try {
      const token = crypto.randomUUID() as string;

      await query("INSERT INTO `sessions` (`userId`, `token`) VALUES (?, ?);", [
        userId,
        token,
      ]);

      const session = await this.sessionRepository.findByToken(token);

      if (session !== null) {
        return session;
      }
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        if (Object.hasOwn(err, "sqlState")) {
          throw err;
        }
      }
    }

    return null;
  }
}
