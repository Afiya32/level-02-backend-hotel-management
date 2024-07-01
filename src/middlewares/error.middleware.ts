
// error handler

import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errorMessages = err.errorMessages || [];

    if (err instanceof ZodError) {
        statusCode = 400;
        message = "Validation Error";
        errorMessages = err.errors.map((error) => ({
            path: error.path.join('.'),
            message: error.message,
        }));
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = "Cast Error";
    } else if (err.code && err.code === 11000) {
        statusCode = 400;
        message = "Duplicate Entry";
        errorMessages = [{
            path: "",
            message: err.message,
        }];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler;
