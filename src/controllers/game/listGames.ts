import { Request, Response } from "express";
import { signedInUser } from "../../global.js";
import { handleError } from "../../utils/error.js";
import { ListService } from "../../services/listService.js";

export class ListGamesController {
  async invoke(req: Request, res: Response) {
    try {
      if (!signedInUser.id) {
        throw new Error("User not set");
      }

      const listService = new ListService();

      const games = await listService.getGameList(signedInUser.id);

      res.json(games);
    } catch (error) {
      const response = handleError(error);
      res.status(400);
      res.json(response);
    }
  }
}
