import { Router } from "express";
import { SearchGameController } from "../controllers/game/searchGame.js";
import { checkSession } from "./middleware.js";
import { AddGameController } from "../controllers/game/addGame.js";

export const gameRouter = Router();

gameRouter.get("/search/:query", new SearchGameController().invoke);
gameRouter.post("/add", checkSession, new AddGameController().invoke);
