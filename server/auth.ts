import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { storage } from './storage';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    user?: {
      id: string;
      username: string;
      email: string;
      role: string;
      firstName?: string;
      lastName?: string;
    };
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export async function createDefaultAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await storage.getUserByUsername('admin');
    if (existingAdmin) {
      console.log('Default admin already exists');
      return;
    }

    // Create default admin user
    const hashedPassword = await hashPassword('admin123');
    await storage.createUser({
      username: 'admin',
      email: 'admin@dogyears.com',
      password: hashedPassword,
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User'
    });

    console.log('✅ Default admin created: username: admin, password: admin123');
  } catch (error) {
    console.error('Failed to create default admin:', error);
  }
}