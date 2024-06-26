// auth.middleware

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface User {
  role: string; 
}

interface AuthenticatedRequest extends Request {
  user?: User;
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as JwtPayload;
    req.user = decoded as User; 
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
    });
  }
};

const authenticateAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  authenticate(req, res, () => {
    if (req.user && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Forbidden",
      });
    }
    next();
  });
};

export const authMiddleware = {
  authenticate,
  authenticateAdmin,
};