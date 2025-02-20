import { Request, Response } from "express";
import { object, string } from "yup";
import { handleError } from "../../utils/error.js";
import { UserService } from "../../services/userService.js";

export class DeleteUserController {
  async invoke(req: Request, res: Response) {
    const requestValidation = object({
      email: string().email().required(),
      password: string().required(),
    });

    try {
      const request = await requestValidation.validate(req.body, {
        abortEarly: false,
      });

      const userService = new UserService();

      const result = await userService.deleteUser(
        request.email,
        request.password
      );

      res.json({
        success: result,
      });
    } catch (error) {
      const response = handleError(error);
      res.status(400);
      res.json(response);
    }
  }
}
