import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import UserRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
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

app.use('/api/user', UserRouter)
app.use ('/api/auth', authRouter);
