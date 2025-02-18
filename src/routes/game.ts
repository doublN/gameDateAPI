import { Router } from "express";
import { SearchGameController } from "../controllers/game/searchGame";

export const gameRouter = Router();

gameRouter.get("/search/:query", new SearchGameController().invoke);
