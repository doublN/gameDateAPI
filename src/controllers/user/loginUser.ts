import { Request, Response } from "express";
import { object, string } from "yup";
import { UserService } from "../../services/userService.js";
import { handleError } from "../../utils/error.js";

export type loginUserRequest = {
  email: string;
  password: string;
};

export class LoginUserContoller {
  async invoke(req: Request, res: Response) {
    const requestValidation = object({
      email: string().email().required(),
      password: string().required(),
    });

    try {
      const request = await requestValidation.validate(req.body, {
        abortEarly: false,
      });

      const userLoginService = new UserService();

      const token = await userLoginService.login(
        request.email,
        request.password
      );

      res.json({ token });
    } catch (error) {
      const response = handleError(error);
      res.status(400);
      res.json(response);
    }
  }
}
