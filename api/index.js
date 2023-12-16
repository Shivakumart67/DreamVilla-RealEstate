import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Database is Connected')
})
.catch((err)=>{
    console.log(err)
})
const app = express();


app.listen(4000, ()=>{
    console.log('Backend is Connected with PORT: 4000')
})