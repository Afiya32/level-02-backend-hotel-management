// user routes

import express from "express";
import { UserController } from "./user.controller";
import { z } from 'zod';
import { userLoginSchema, userSignupSchema } from "./user.validation";

const UserRouter = express.Router();

// Middleware to validate request body using Zod schema
const validate = (schema: z.ZodSchema<any>) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(error.errors);
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

// User signup route
UserRouter.post('/auth/signup', validate(userSignupSchema), UserController.createUser);

// User login route
UserRouter.post('/auth/login', validate(userLoginSchema), UserController.loginUser);

export default UserRouter;
