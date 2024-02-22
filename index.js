import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import landingRoute from './route/landingPage.js';
import productRoute from './route/product.js';
import authRouter from './route/authRoutes.js';
import cookieParser from 'cookie-parser';
import userRouter from './route/userRoute.js'
import feedbackRouter from './route/feedbackRoutes.js';

dotenv.config();

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true // Allow credentials (cookies) to be included
  };


//   const corsOptions = {
//     origin: '*',
//     credentials: true // Allow credentials (cookies) to be included
//   };


// app.use(express.urlencoded({ limit: '2mb' }))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(cors(corsOptions))
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.send('hello')
})



app.use('/api/admin/landingpage',landingRoute);
app.use('/api/admin/product',productRoute);
app.use('/api/user/feedback',feedbackRouter)

app.use('/api/user/auth',authRouter)
app.use('/api/admin/users',userRouter)



mongoose.set('strictQuery',true);
mongoose.connect(process.env.DB_CONNECT,()=>{
    app.listen(8001,()=>{
        console.log('server is running');
    })
    console.log('connected to mongo')
})




