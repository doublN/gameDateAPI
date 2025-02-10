import { SessionFactory } from "../factories/session.js";
import { SessionModel } from "../models/session.js";
import { UserRepository } from "../repositories/user.js";
import argon2 from "argon2";

export class UserLoginService {
  private readonly userRepository = new UserRepository();
  private readonly sessionFactory = new SessionFactory();

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      throw new Error("Cannot find user");
    }

    const isVerified = await argon2.verify(user?.user.hashedPassword, password);

    if (!isVerified) {
      throw new Error("Incorrect password");
    }

    const newSession = await this.sessionFactory.createSession(user.user.id);

    if (newSession instanceof SessionModel) {
      return newSession.session.token;
    }

    throw new Error("Could not create session");
  }
}
