import { query } from "../db/db.js";
import { UserModel, User } from "../models/user.js";

export class UserRepository {
  async findByEmail(email: string): Promise<UserModel | null> {
    const [result] = await query("SELECT * FROM `users` WHERE `email` = ?", [
      email,
    ]);

    if (Array.isArray(result) && result.length > 0) {
      const user = new UserModel(result[0] as User);
      return user;
    }

    return null;
  }
}
