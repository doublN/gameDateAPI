import { FieldPacket } from "mysql2";
import { query } from "../db/db.js";
import { signedInUser } from "../global.js";
import { getGameById } from "../igdb/index.js";
import { CoverService } from "./coverService.js";
import { GameService } from "./gameService.js";

export type GameListGame = {
  id: number;
  cover: string;
  name: string;
  firstReleaseDate: number;
};

export class ListService {
  gameService = new GameService();
  coverService = new CoverService();

  async addGameToList(gameId: number) {
    if (!signedInUser.id) {
      throw new Error("User not set");
    }

    const game = await getGameById(gameId);

    await this.gameService.addGameToDB(game);

    if (game.cover) {
      await this.coverService.addCoverToDB(game.cover);
    }

    await query(`INSERT INTO list (userId, gameId) VALUES (?, ?)`, [
      signedInUser.id,
      game.id,
    ]);
  }

  async getGameList(userId: number): Promise<Array<GameListGame>> {
    const [games] = (await query(
      "SELECT games.id, games.firstReleaseDate, games.name, covers.url as cover FROM list INNER JOIN games ON list.gameId = games.id INNER JOIN covers ON covers.id = games.cover WHERE list.userId = ? ORDER BY games.firstReleaseDate ASC",
      [userId]
    )) as [GameListGame[], FieldPacket[][]];

    if (Array.isArray(games) && games.length > 0) {
      return games.map((game) => {
        return {
          ...game,
          firstReleaseDate: game.firstReleaseDate * 1000,
          cover: game.cover.replace("t_thumb", "t_cover_big"),
        };
      });
    }

    return [];
  }
}
