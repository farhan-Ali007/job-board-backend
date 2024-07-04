import mongoose from "mongoose";
import validator from "validator";
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minLength: [3, "Name must be atleast 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email"]
    },
    phone: {
        type: Number,
        required: [true, "Please enter your phone number"]
    },
    password: {
        type: String,
        required: [true, "Please enter the Passord"],
        minLength: [8, "Password must be atleast 8 characters"],
        maxLength: [32, "Password cannot exceed 32 characters"],
        select:false,
    },
    role: {
        type: String,
        required: [true, "Please provide your role"],
        enum: ["Job Seeker", "Employer"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

//Hashing the password

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Comparing password

userSchema.methods.comparePassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password)
}

//Generating a jwt token for authorization
userSchema.methods.getToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
};


export const
    User = mongoose.model("User", userSchema)