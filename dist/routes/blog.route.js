"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controller/blog.controller");
const auth_1 = require("../middleware/auth");
const validate_1 = __importDefault(require("../middleware/validate"));
const blog_schema_1 = require("../zod_schema/blog.schema");
const router = express_1.default.Router();
router.post('/login', (0, validate_1.default)(blog_schema_1.loginSchema), blog_controller_1.loginHandler);
router.post('/register', (0, validate_1.default)(blog_schema_1.registerSchema), blog_controller_1.registerHandler);
router.get('/', auth_1.protect, blog_controller_1.getBlog);
router.post('/', auth_1.protect, (0, validate_1.default)(blog_schema_1.addBlogSchema), blog_controller_1.addBlog);
router.put('/:blogid', auth_1.protect, (0, validate_1.default)(blog_schema_1.updateBlogSchema), blog_controller_1.updateBlog);
router.delete('/:blogid', auth_1.protect, (0, validate_1.default)(blog_schema_1.deleteBlogSchema), blog_controller_1.deleteBlog);
exports.default = router;
