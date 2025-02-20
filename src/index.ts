import dotenv from "dotenv";
import express, { Express } from "express";

import { userRouter } from "./routes/user.js";
import { fetchCredentials } from "./igdb/index.js";
import { gameRouter } from "./routes/game.js";

dotenv.config();

export const app: Express = express();
app.use(express.json());
const port = process.env.PORT ?? 3000;

app.use("/user", userRouter);
app.use("/game", gameRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, async () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);

    try {
      await fetchCredentials();
    } catch (error) {
      console.log("error fetching credentials");
      console.log(error);
    }
  });
}
