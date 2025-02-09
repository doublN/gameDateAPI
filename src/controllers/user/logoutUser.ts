import { Request, Response } from "express";
import { SessionService } from "../../services/sessionService.js";
import { handleError } from "../../utils/error.js";
import { getBearer } from "../../utils/headers.js";

export class LogoutUserController {
  async invoke(req: Request, res: Response) {
    const sessionService = new SessionService();

    const bearer = getBearer(req.headers);
    try {
      if (bearer === "") {
        res.status(401).end();
        throw new Error("Incorrect bearer token");
      }

      const result = await sessionService.deleteSession(bearer);
      res.json({
        success: result,
      });
    } catch (error) {
      const response = handleError(error);

      res.json(response);
      res.status(400).end();
    }
  }
}
