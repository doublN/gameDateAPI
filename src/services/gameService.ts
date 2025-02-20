import { getGamesBySearch } from "../igdb/index.js";

export class GameService {
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
}
