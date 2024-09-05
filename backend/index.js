import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import userAuthRouter from './routes/user_auth_route.js'
import constitutionRouter from './routes/constitution_route.js'

dotenv.config()

mongoose.connect(process.env.mongodbURL).then(()=>{
    console.log("Connected to MongoDB!!")
}).catch((err)=>{ 
    console.log(err)
})
 
const app = express();
app.use(express.json());
app.use(cors());

//all routesss

app.use('/api/auth', userAuthRouter);
app.use('/api/learn', constitutionRouter);



app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(process.env.PORT, ()=>{
    console.log(`App is runing on ${process.env.PORT}!!`)
})