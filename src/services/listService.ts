import { query } from "../db/db.js";
import { signedInUser } from "../global.js";
import { getGameById } from "../igdb/index.js";
import { CoverService } from "./coverService.js";
import { GameService } from "./gameService.js";

export class ListService {
  gameService = new GameService();
  coverService = new CoverService();

  async addGameToList(gameId: number) {
    if (!signedInUser.id) {
      throw new Error("No user id");
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
}
