import { Blog, User } from "@prisma/client";
import { Request, Response } from "express";
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../config/db';
import { IUser } from "../middleware/auth";

export const getBlog = async (req: Request, res: Response) => {
    const user = res.locals.user as IUser;

    const blogs = await prisma.blog.findMany({
        where: {user_id: user.id},
    });
    return res.status(200).json(blogs)
};

export const addBlog = async (req: Request, res: Response) => {
    const {title, message} = req.body as Blog
    const user = res.locals.user as IUser;
    await prisma.blog.create({
        data: {
            title ,
            user_id: user.id,
            message,
        },
    });

    return res.status(201).json({
        message: 'New blog created for user: '+ user.id,
    });

};

export const updateBlog = (req: Request, res: Response) => {

};

export const deleteBlog = (req: Request, res: Response) => {

};



export const loginHandler = async (req: Request, res: Response) => {
    const {username, password} = req.body as User;

    const user = await prisma.user.findUnique({
        where: { username },
    });
    if(!user) {
        return res.status(400).json({
            message: "Wrong username or password !"
        });
    }

    const isMatched = await argon2.verify(user.password, password);

    if(!isMatched){
        return res.status(400).json({
            message: "Wrong username or password !"
        });
    }

    const token = jwt.sign({id:user.id}, process.env.JWT_SECRET as string,
        {
            expiresIn: '2 days',
        }
        );

        return res.status(200).json({
            message: 'Welcome Back '+user.username,
            token,
        });
};

export const registerHandler = async (req: Request, res: Response) => {
    try{

    
    const {username, password, email} = req.body as User;
    const hashedPassword = await argon2.hash(password);

    await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            email
        },
    });

  return res.status(201).json({
    message: 'New user added '
  })  
}catch(error){
    console.log(error);
    return res.status(400).json({
        message: 'Issue with your input'
    });
}
};