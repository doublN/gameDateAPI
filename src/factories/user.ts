import { query } from "../db/db.js";
import { User, UserModel } from "../models/user.js";
import { UserRepository } from "../repositories/user.js";
import argon2 from "argon2";

export type UserFactoryType = Pick<User, "username" | "email"> & {
  password: string;
};

export class UserFactory {
  private readonly userRepository = new UserRepository();

  async createUser(data: UserFactoryType): Promise<UserModel | null> {
    const hash = await argon2.hash(data.password);

    await query(
      "INSERT INTO `users` (`username`, `email`, `hashedPassword`) VALUES (?, ?, ?);",
      [data.username, data.email, hash]
    );

    const user = await this.userRepository.findByEmail(data.email);

    if (user !== null) {
      return user;
    }

    return null;
  }
}
