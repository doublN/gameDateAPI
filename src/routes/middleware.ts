import { NextFunction, Request, Response } from "express";
import { SessionService } from "../services/sessionService.js";
import { handleError } from "../utils/error.js";
import { getBearer } from "../utils/headers.js";

export const checkSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers;

  const bearer = getBearer(headers);

  if (bearer === "") {
    res.status(401).end();
    return;
  }

  const sessionService = new SessionService();

  try {
    const isSessionActive = await sessionService.checkSessionActive(bearer);

    if (!isSessionActive) {
      res.status(401).end();
      sessionService.deleteSession(bearer);
    } else {
      next();
    }
  } catch (error) {
    const response = handleError(error);
    res.json(response);
    res.status(400).end();
  }
};
