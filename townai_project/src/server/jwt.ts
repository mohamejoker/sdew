import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = process.env.JWT_SECRET || "default-secret";

export function generateToken(payload: object) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      req.user = verifyToken(token);
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ error: "No token provided" });
  }
}
