// server/auth.ts — JWT auth utilities
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = "7d";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): { userId: number } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    return decoded;
  } catch {
    return null;
  }
}

export interface AuthedRequest extends Request {
  userId?: number;
}

export function authMiddleware(req: AuthedRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return _res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.slice(7);
  const decoded = verifyToken(token);
  if (!decoded) {
    return _res.status(401).json({ error: "Invalid token" });
  }
  req.userId = decoded.userId;
  next();
}

export function cronAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const secret = req.headers["x-cron-secret"] as string;
  if (!secret || secret !== process.env.CRON_SECRET) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
}
