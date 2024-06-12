import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    success: false,
    message: err.message || "Internal Server Error",
    errorMessages: err.errorMessages || [],
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
