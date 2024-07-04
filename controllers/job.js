import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import { Job } from "../models/job.js"


const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false })

    res.status(200).json({
        success: true,
        jobs
    })
})

const postJobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job Seeker is not allowed to access these resources"));
    }

    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, expired } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("Please provide job details", 400));
    }

    if ((salaryFrom || salaryTo) && fixedSalary) {
        return next(new ErrorHandler("Cannot enter both fixed salary and ranged salary together", 400));
    }

    const postedBy = req.user._id;

    try {
        const job = await Job.create({
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
            salaryFrom,
            salaryTo,
            expired,
            postedBy,
        });

        res.status(200).json({
            success: true,
            message: "Job posted successfully",
            job,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

const getMyJobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
    }
    const myJobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        myJobs,
    });
});

const updateMyJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job Seeker is not allowed to access these resources", 400));
    }

    const { id } = req.params;
    let job = await Job.findById(id);

    if (!job) {
        return next(new ErrorHandler("Oops! job not found", 400));
    }

    try {
        job = await Job.findByIdAndUpdate(
            id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
        );

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

const deleteMyJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job Seeker is not allowed to access these resources", 400));
    }

    const { id } = req.params;
    let job = await Job.findById(id);

    if (!job) {
        return next(new ErrorHandler("Oops! job not found", 400));
    }
    await Job.deleteOne()
    res.status(200).json({
        success: true,
        message: "Job deleted successfully!"
    })


});

const getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job =await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Job not found", 404))
        }
        res.status(200).json({
            success: true,
            job
        })

    } catch (error) {
        console.log("Error in getting single job", error)
    }
})

export { getAllJobs, postJobs, getMyJobs, updateMyJob, deleteMyJob,getSingleJob }
