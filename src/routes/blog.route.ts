import express from 'express';
import { addBlog, deleteBlog, getBlog, loginHandler, registerHandler, updateBlog } from '../controller/blog.controller';
import { protect } from '../middleware/auth';
import validate from '../middleware/validate';
import { addBlogSchema, deleteBlogSchema, loginSchema, registerSchema, updateBlogSchema } from '../zod_schema/blog.schema';

const router = express.Router();

router.post('/login', validate(loginSchema), loginHandler);
router.post('/register', validate(registerSchema), registerHandler);
router.get('/', protect,getBlog, );
router.post('/',protect, validate(addBlogSchema),addBlog );
router.put('/:blogid',protect, validate(updateBlogSchema),updateBlog);
router.delete('/:blogid',protect, validate(deleteBlogSchema),deleteBlog );

export default router; 