import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
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


export default validate;