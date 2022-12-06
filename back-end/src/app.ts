import express from 'express'
import { connectDB } from './config/db';
import blogRouter from './routes/blog.route';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(express.json())

connectDB(); 

app.use(cors());

app.use('/api/v1/blog', blogRouter);


const PORT = process.env.PORT || 5015
app.listen(PORT, () => {
    console.log('server is running in port '+ PORT)
});