// src/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as jwt.JwtPayload;
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
