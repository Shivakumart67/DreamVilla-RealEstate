import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import UserRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
dotenv.config()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Database is Connected')
})
.catch((err)=>{
    console.log(err)
})
const app = express();
app.use(express.json())
app.listen(4000, ()=>{
    console.log('Backend is Connected with PORT: 4000')
})
app.use(cors());
app.use('/api/user', UserRouter)
app.use ('/api/auth', authRouter);


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    return res.status(statusCode).json(
        {
            success: false,
            statusCode,
            message
        }
    )
}) 
