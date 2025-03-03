import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const token = req.header('Authorization')?.split(' ')[1];
  const SECRET = process.env.JWT_SECRET as string;

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
    res.status(403).json({ message: 'Invalid token' });
    return; // Satisfies Typescript
    }

    req.user = decoded as JwtPayload; // Attach user data to request
    next();
  });

  return; // Satisfies Typescript

};
