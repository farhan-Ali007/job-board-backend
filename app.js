import express from 'express';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/user.js'
import applicationRouter from './routes/application.js'
import jobRouter from './routes/job.js'
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';



const app = express();
dotenv.config({ path: './config/config.env' })

//Cloudinry configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp/'
}))

//Api endPoints
app.use('/api/v1/user', userRouter)
app.use('/api/v1/application', applicationRouter)
app.use('/api/v1/job', jobRouter)


//db connection
dbConnection();

//Error Middleware
app.use(errorMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(
        `Server is running on ${PORT}`
    )
})
export default app;