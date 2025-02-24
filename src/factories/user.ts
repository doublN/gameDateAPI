import { query } from "../db/db.js";
import { User } from "../models/user.js";
import { UserRepository } from "../repositories/user.js";
import argon2 from "argon2";

export type UserFactoryType = Pick<User, "username" | "email"> & {
  password: string;
};

export class UserFactory {
  private readonly userRepository = new UserRepository();

  async createUser(data: UserFactoryType): Promise<User | null> {
    const hash = await argon2.hash(data.password);

    await query(
      "INSERT INTO `users` (`username`, `email`, `hashedPassword`) VALUES (?, ?, ?);",
      [data.username, data.email, hash]
    );

    return await this.userRepository.findByEmail(data.email);
  }
}
