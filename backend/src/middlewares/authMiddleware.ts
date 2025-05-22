// npm install jsonwebtoken
// npm install --save-dev @types/jsonwebtoken
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  userId: string;
  name: string;
  email: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
    name?: string;
    email?: string;
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(403).json({ error: 'Token necessário' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.userId = decoded.userId;
    req.name = decoded.name;
    req.email = decoded.email;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }
}
