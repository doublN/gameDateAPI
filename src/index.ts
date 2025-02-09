import dotenv from "dotenv";
import express, { Express } from "express";

import { userRouter } from "./routes/user.js";

dotenv.config();

export const app: Express = express();
app.use(express.json());
const port = process.env.PORT ?? 3000;

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
