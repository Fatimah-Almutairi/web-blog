import {z} from 'zod';

export const registerSchema = z.object({
    body: z.object({
        username: z.
        string({required_error:'Username is required', invalid_type_error: 'Username must be a string'})
        .min(4,'Username must be more than 4 char').max(15, 'Username must be less than 15 char'),
        password: z
        .string({required_error:'Password is required'})
        .min(6,'Password must be more than 6 char').max(15, 'Password must be less than 15 char')
        .regex(new RegExp('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'), 'Your Password is not strong '),
        email: z         
        .string({required_error:'Email is required', invalid_type_error: 'Email must be a string'})
        .email('Please enter a valid email'),
    }),
});  

export const loginSchema = z.object({
    body: z.object({
        username: z.string({
            required_error:'Username is required', invalid_type_error: 'Username must be a string'
        }),
        password: z.string({
            required_error:'Password is required', invalid_type_error: 'Password must be a string'
        }),
    })
});

export const addBlogSchema = z.object({
    body: z.object({
        title:z.
        string({required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'})
    .max(15, 'Title must be less than 15 char')
    }),
    message: z.string({required_error:'Message is required'}),
});

export const updateBlogSchema = z.object({
    body: z.object({
        title:z.
        string({required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'})
    .max(15, 'Title must be less than 15 char'),
    message: z.string({required_error:'Message is required'}),
    }),

    params: z.object({
        blogid: z.string({required_error:'id is required', 
    invalid_type_error:' blog id is must be string'})
    })
});


export const deleteBlogSchema = z.object({
    params: z.object({
        blogid: z.string({required_error:'id is required', 
    invalid_type_error:' blog id is must be string'})
    })
});


export type updateBlogSchemaType = z.infer < typeof updateBlogSchema> ['params'];
export type deleteBlogSchemaType = z.infer < typeof deleteBlogSchema> ['params'];