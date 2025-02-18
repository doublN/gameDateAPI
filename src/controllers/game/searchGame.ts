import yup from "yup";
import { Request, Response } from "express";
import { GameService } from "../../services/gameService";
import { handleError } from "../../utils/error.js";

export class SearchGameController {
  async invoke(req: Request, res: Response) {
    const validation = yup.string().required();

    try {
      const query = await validation.validate(req.params.query);

      const gameService = new GameService();

      const games = await gameService.searchGame(query);

      res.json(games);
    } catch (error) {
      const response = handleError(error);
      res.status(400);
      res.json(response);
    }
  }
}
