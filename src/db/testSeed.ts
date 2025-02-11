import argon2 from "argon2";
import { query } from "./db";
import { testSessions, testUsers } from "./testData";

export const testSeed = async () => {
  try {
    await query("DROP TABLE IF EXISTS sessions;");
    await query("DROP TABLE IF EXISTS users;");

    await query(
      "CREATE TABLE users (id int unsigned NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, email varchar(255) NOT NULL, hashedPassword varchar(255) NOT NULL, verified tinyint(1) DEFAULT 0, createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP, updatedAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), UNIQUE KEY username (username), UNIQUE KEY email (email));"
    );

    await query(
      "CREATE TABLE sessions (userId int unsigned NOT NULL, token varchar(255) NOT NULL, createdAt TIMESTAMP default CURRENT_TIMESTAMP, FOREIGN KEY (userId) REFERENCES users(id));"
    );

    testUsers.map(async ({ username, email, password }) => {
      const hashedPassword = await argon2.hash(password);

      await query(
        "INSERT INTO users (username, email, hashedPassword) VALUES (?, ?, ?);",
        [username, email, hashedPassword]
      );
    });

    testSessions.map(async ({ userId, token }) => {
      await query("INSERT INTO sessions (userId, token) VALUES (?, ?);", [
        userId,
        token,
      ]);
    });
  } catch (error) {
    console.log(error);
  }
};
