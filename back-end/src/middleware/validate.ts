import { NextFunction, Request , RequestHandler, Response } from "express";
import { AnyZodObject, Schema, ZodError } from "zod";

const validate = (Schema: AnyZodObject) => 
(req: Request, res: Response, next: NextFunction) => {
    try {
        Schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        })
        next();
    }catch(error) {
        const zodError = error as ZodError
        return res.status(400).json({
            message: zodError.errors[0].message,
        });
    }
};


export default validate;