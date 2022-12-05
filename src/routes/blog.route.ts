import express from 'express';
import { loginHandler, registerHandler } from '../controller/blog.controller';
import validate from '../middleware/validate';
import { loginSchema, registerSchema } from '../zod_schema/blog.schema';

const router = express.Router();

router.post('/login', validate(loginSchema), loginHandler);
router.post('/register', validate(registerSchema), registerHandler);

export default router; 