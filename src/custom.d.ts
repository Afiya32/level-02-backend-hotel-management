// src/custom.d.ts

import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload | string; // Add user property to Request interface
  }
}
