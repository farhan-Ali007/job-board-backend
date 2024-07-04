import mongoose from "mongoose";


export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_JOB_SEEKING_SITE"
    }).then(() => {
        console.log("Connected to DB")
    }).catch((err) => {
        console.log("Error connecting to Database",err)
    })
}