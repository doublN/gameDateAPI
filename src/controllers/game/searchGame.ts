import { Request, Response } from "express";
import { GameService } from "../../services/gameService.js";
import { handleError } from "../../utils/error.js";

export class SearchGameController {
  async invoke(req: Request, res: Response) {
    try {
      const gameService = new GameService();

      const games = await gameService.searchGame(req.params.query);

      res.json(games);
    } catch (error) {
      const response = handleError(error);
      res.status(400);
      res.json(response);
    }
  }
}
