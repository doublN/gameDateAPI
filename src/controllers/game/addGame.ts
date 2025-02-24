import { Request, Response } from "express";
import { handleError } from "../../utils/error.js";
import { number, object } from "yup";
import { ListService } from "../../services/listService.js";

export class AddGameController {
  async invoke(req: Request, res: Response) {
    const validation = object({
      gameId: number().required(),
    });

    try {
      const { gameId } = await validation.validate(req.body);

      const listService = new ListService();

      listService.addGameToList(gameId);

      res.json({ success: true });
    } catch (error) {
      const response = handleError(error);
      res.status(400);
      res.json(response);
    }
  }
}
