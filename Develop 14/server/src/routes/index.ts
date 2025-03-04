import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

console.log("Registering /auth routes...");
router.use('/auth', authRoutes);
console.log("Auth routes registered:", authRoutes);
// TODO: Add authentication to the API routes
router.use('/api', authenticateToken, apiRoutes);

export default router;
