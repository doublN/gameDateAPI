import { query } from "../db/db.js";
import { SessionRepository } from "../repositories/session.js";
import { timeDifference } from "../utils/date.js";

export class SessionService {
  private readonly sessionRepository = new SessionRepository();

  async checkSessionActive(token: string): Promise<boolean> {
    const session = await this.sessionRepository.findByToken(token);

    if (session === null) {
      return false;
    }

    if (timeDifference(new Date(), session.session.createdAt, "days") > 30) {
      return false;
    }

    return true;
  }

  async deleteSession(token: string): Promise<boolean> {
    await query("DELETE FROM `sessions` WHERE `token` = ? ", [token]);
    return true;
  }
}
