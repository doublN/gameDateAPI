import { query } from "../db/db.js";
import { User } from "../models/user.js";

export class UserRepository {
  async findByEmail(email: string): Promise<User> {
    const [result] = await query("SELECT * FROM `users` WHERE `email` = ?", [
      email,
    ]);

    if (Array.isArray(result) && result.length > 0) {
      return result[0] as User;
    }

    throw new Error("Cannot find user");
  }
}
