import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
  throw new Error('JWT_SECRET is not defined in environment variabels');
}

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new HttpError('Token tidak ditemukan', 401); 
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    req.user = decoded;
    next();
  } catch (error) {
      if (error instanceof HttpError){
        next(error);
      } else {
        next(new HttpError('Authentication failed', 500));
      }
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    next(new HttpError('Access denied. Admin only.', 403)); 
  }
  next();
};