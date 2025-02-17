import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please providejob title"],
        minLength: [3, "Job title must contain atleast 3 letters"],
        maxLength: [50, "Job title cannot exceed 50 letters"]
    },
    description: {
        type: String,
        required: [true, "Please provide job description"],
        minLength: [3, "Job description must contain atleast 3 letters"],
        maxLength: [350, "Job description cannot exceed 350 letters"]
    },
    category: {
        type: String,
        required: [true, "Job category is required"],

    },
    country: {
        type: String,
        required: [true, "Job country is required"],

    },
    city: {
        type: String,
        required: [true, "Job city is required"],

    },
    location: {
        type: String,
        required: [true, "Please provide your exact location"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Fixed salary must contain atleast 4 digits"],
        maxLength: [9, "Fixed salary cannot exceed  9 digits"]
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Salary from must contain atleast 4 digits"],
        maxLength: [9, "Salary from cannot exceed  9 digits"]
    },
    salaryTo: {
        type: Number,
        minLength: [4, "Salary to must contain atleast 4 digits"],
        maxLength: [9, "Salary to cannot exceed  9 digits"]
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }

})

export const Job = mongoose.model("Job", jobSchema)