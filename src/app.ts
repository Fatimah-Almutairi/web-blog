import express from 'express'
import { connectDB } from './config/db';
import blogRouter from './routes/blog.route';
import 'dotenv/config';

const app = express();

connectDB(); 

app.use('/api/v1/blog', blogRouter)

app.listen(5000, () => {
    console.log('server is running in port 5000')
});