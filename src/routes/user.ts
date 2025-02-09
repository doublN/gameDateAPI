import { Router } from "express";
import { CreateUserController } from "../controllers/user/createUser.js";
import { LoginUserContoller } from "../controllers/user/loginUser.js";
import { LogoutUserController } from "../controllers/user/logoutUser.js";
import { checkSession } from "./middleware.js";

export const userRouter = Router();

userRouter.post("/create", new CreateUserController().invoke);
userRouter.post("/login", new LoginUserContoller().invoke);
userRouter.delete("/logout", checkSession, new LogoutUserController().invoke);

//delete
