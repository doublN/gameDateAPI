import { query } from "../db/db.js";
import { signedInUser } from "../global.js";
import { SessionRepository } from "../repositories/session.js";
import { timeDifference } from "../utils/date.js";

export class SessionService {
  private readonly sessionRepository = new SessionRepository();

  async checkSessionActive(token: string): Promise<boolean> {
    const session = await this.sessionRepository.findByToken(token);

    if (session === null) {
      return false;
    }

    if (timeDifference(new Date(), session.createdAt, "days") > 30) {
      return false;
    }

    return true;
  }

  async setSignedInUserByToken(token: string) {
    if (signedInUser.id === null || signedInUser.email === null) {
      const sessionWithUser = await this.sessionRepository.findByTokenJoin(
        token
      );

      if (sessionWithUser) {
        signedInUser.email = sessionWithUser.email;
        signedInUser.id = sessionWithUser.userId;
        return;
      }

      throw new Error("Cannot set user");
    }
  }

  async deleteSession(token: string): Promise<boolean> {
    await query("DELETE FROM `sessions` WHERE `token` = ? ", [token]);
    return true;
  }
}
