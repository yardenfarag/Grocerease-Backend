import express, { Router } from 'express';
import { Request, Response } from 'express';
import { login, signup, logout } from './auth.controller';

const router: Router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

export default router;
