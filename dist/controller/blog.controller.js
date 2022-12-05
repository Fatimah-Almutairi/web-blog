"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandler = exports.loginHandler = exports.deleteBlog = exports.updateBlog = exports.addBlog = exports.getBlog = void 0;
const argon2 = __importStar(require("argon2"));
const jwt = __importStar(require("jsonwebtoken"));
const db_1 = require("../config/db");
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const blogs = yield db_1.prisma.blog.findMany({
        where: { user_id: user.id },
    });
    return res.status(200).json(blogs);
});
exports.getBlog = getBlog;
const addBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, message } = req.body;
    const user = res.locals.user;
    yield db_1.prisma.blog.create({
        data: {
            title,
            user_id: user.id,
            message,
        },
    });
    return res.status(201).json({
        message: 'New blog created for user: ' + user.id,
    });
});
exports.addBlog = addBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const updateBlog = req.body;
        const { blogid } = req.params;
        const isUpdated = yield db_1.prisma.blog.updateMany({
            where: {
                id: blogid,
                user_id: user.id,
            },
            data: updateBlog
        });
        if (isUpdated.count == 0) {
            return res.status(400).json({
                message: 'Invalid blog id .. '
            });
        }
        return res.status(200).json({
            message: 'Blog Updated'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Server Error !',
        });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { blogid } = req.params;
    const deleteblogCount = yield db_1.prisma.blog.deleteMany({
        where: {
            id: blogid,
            user_id: user.id
        },
    });
    if (deleteblogCount.count == 0) {
        return res.status(400).json({
            message: 'Invalid blog id ..'
        });
    }
    return res.status(200).json({
        message: 'Blog deleted'
    });
});
exports.deleteBlog = deleteBlog;
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.prisma.user.findFirst({
        // Check here later ....
        where: { username },
    });
    if (!user) {
        return res.status(400).json({
            message: "Wrong username or password !"
        });
    }
    const isMatched = yield argon2.verify(user.password, password);
    if (!isMatched) {
        return res.status(400).json({
            message: "Wrong username or password !"
        });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '2 days',
    });
    return res.status(200).json({
        message: 'Welcome Back ' + user.username,
        token,
    });
});
exports.loginHandler = loginHandler;
const registerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = yield argon2.hash(password);
        yield db_1.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email
            },
        });
        return res.status(201).json({
            message: 'New user added '
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Issue with your input'
        });
    }
});
exports.registerHandler = registerHandler;
