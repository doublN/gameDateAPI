import { Request, Response } from "express";
import { number, object } from "yup";
import { handleError } from "../../utils/error.js";
import { ListService } from "../../services/listService.js";

export class RemoveGameController {
  async invoke(req: Request, res: Response) {
    const validation = object({
      gameId: number().required(),
    });

    try {
      const { gameId } = await validation.validate(req.body);

      const listService = new ListService();

      listService.removeGameFromList(gameId);

      res.json({ success: true });
    } catch (error) {
      const response = handleError(error);
      res.status(400);
      res.json(response);
    }
  }
}
