import express from 'express'
import { connectDB } from './config/db';
import blogRouter from './routes/blog.route';
import 'dotenv/config';

const app = express();
app.use(express.json())

connectDB(); 

app.use('/api/v1/blog', blogRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server is running in port 5000')
});