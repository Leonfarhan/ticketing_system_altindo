import express from 'express';
import { register, login } from '../controllers/userController';
import { auth, isAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/register', auth, isAdmin, register);
router.post('/login', login);

export default router;