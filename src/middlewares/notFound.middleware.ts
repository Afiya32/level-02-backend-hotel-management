
// not found handler
import { Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
};

export default notFoundHandler;

