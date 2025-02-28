import { Router } from "express";
import { SearchGameController } from "../controllers/game/searchGame.js";
import { checkSession } from "./middleware.js";
import { AddGameController } from "../controllers/game/addGame.js";
import { ListGamesController } from "../controllers/game/listGames.js";
import { RemoveGameController } from "../controllers/game/removeGame.js";

export const gameRouter = Router();

gameRouter.get("/search/:query", new SearchGameController().invoke);
gameRouter.post("/add", checkSession, new AddGameController().invoke);
gameRouter.get("/list", checkSession, new ListGamesController().invoke);
gameRouter.delete("/remove", checkSession, new RemoveGameController().invoke);
