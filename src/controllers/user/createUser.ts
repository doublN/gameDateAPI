import { Request, Response } from "express";
import { UserFactory } from "../../factories/user.js";
import { UserModel } from "../../models/user.js";
import { object, string } from "yup";
import { handleError } from "../../utils/error.js";

export type createUserRequest = {
  username: string;
  email: string;
  password: string;
};

export class CreateUserController {
  async invoke(req: Request, res: Response) {
    const requestValidation = object({
      username: string().required(),
      email: string().email().required(),
      password: string().required(),
    });

    try {
      const userFactory = new UserFactory();

      const request = await requestValidation.validate(req.body, {
        abortEarly: false,
      });

      const newUser = await userFactory.createUser(request);

      if (newUser instanceof UserModel) {
        res.json({
          success: true,
        });
      }
    } catch (error) {
      const response = handleError(error);
      res.status(400);
      res.json(response);
    }
  }
}
