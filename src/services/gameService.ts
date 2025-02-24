import { query } from "../db/db.js";
import { getGamesBySearch } from "../igdb/index.js";
import { Game } from "../models/game.js";
import { CoverService } from "./coverService.js";

export class GameService {
  coverService = new CoverService();

  async searchGame(query: string) {
    const games = await getGamesBySearch(query);

    return games.map((game) => {
      return {
        ...game,
        cover: {
          ...game.cover,
          url: game.cover?.url.replace("t_thumb", "t_cover_small"),
        },
      };
    });
  }

  async addGameToDB(game: Game) {
    await query(
      "INSERT IGNORE INTO games (id, firstReleaseDate, cover, name) VALUES (?, ?, ?, ?)",
      [game.id, game.first_release_date, game?.cover?.id ?? null, game.name]
    );
  }
}
