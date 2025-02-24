import { query } from "./db.js";
import { testSessions, testUsers } from "./testData.js";

export const testSeed = async () => {
  try {
    await query("DROP TABLE IF EXISTS sessions;");
    await query("DROP TABLE IF EXISTS users;");
    await query("DROP TABLE IF EXISTS list");
    await query("DROP TABLE IF EXISTS games");
    await query("DROP TABLE IF EXISTS covers");

    await query(
      "CREATE TABLE users (id int unsigned NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, email varchar(255) NOT NULL, hashedPassword varchar(255) NOT NULL, verified tinyint(1) DEFAULT 0, createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP, updatedAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), UNIQUE KEY username (username), UNIQUE KEY email (email));"
    );

    await query(
      "CREATE TABLE sessions (userId int unsigned NOT NULL, token varchar(255) NOT NULL, createdAt TIMESTAMP default CURRENT_TIMESTAMP, FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE);"
    );

    await query(
      "CREATE TABLE covers (id int unsigned NOT NULL, url VARCHAR(255) NOT NULL, PRIMARY KEY (id));"
    );

    await query(
      "CREATE TABLE games (id int unsigned NOT NULL, firstReleaseDate int unsigned NOT NULL, cover int unsigned, name VARCHAR(255), PRIMARY KEY (id), FOREIGN KEY (cover) REFERENCES covers(id) ON DELETE CASCADE);"
    );

    await query(
      "CREATE TABLE list (userId int unsigned NOT NULL, gameId int unsigned NOT NULL, FOREIGN KEY (gameId) REFERENCES games(id));"
    );

    testUsers.forEach(async ({ username, email, password }) => {
      await query(
        "INSERT INTO users (username, email, hashedPassword) VALUES (?, ?, ?);",
        [username, email, password]
      );
    });

    testSessions.forEach(async ({ userId, token }) => {
      await query("INSERT INTO sessions (userId, token) VALUES (?, ?);", [
        userId,
        token,
      ]);
    });
  } catch (error) {
    console.log(error);
  }
};
