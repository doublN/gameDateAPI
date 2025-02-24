import { query } from "../db/db.js";
import { SessionFactory } from "../factories/session.js";
import { UserRepository } from "../repositories/user.js";
import argon2 from "argon2";

export class UserService {
  private readonly userRepository = new UserRepository();
  private readonly sessionFactory = new SessionFactory();

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      throw new Error("Cannot find user");
    }

    const isVerified = await argon2.verify(user.hashedPassword, password);

    if (!isVerified) {
      throw new Error("Incorrect password");
    }

    const newSession = await this.sessionFactory.createSession(user.id);

    if (newSession !== null) {
      return newSession.token;
    }

    throw new Error("Could not create session");
  }

  async deleteUser(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      throw new Error("Cannot find user");
    }

    const isVerified = await argon2.verify(user.hashedPassword, password);

    if (!isVerified) {
      throw new Error("Incorrect password");
    }

    await query(`DELETE FROM users WHERE email = ?`, [email]);

    return true;
  }
}
