import express from 'express'
const router = express.Router();
import { jobSeekerDeleteApplication, jobSeekerGetAllApplications, employerGetAllApplications, postApplication } from '../controllers/application.js'
import { isAuthorized } from '../middlewares/Auth.js'

//routes
router.get('/jobseeker/getall', isAuthorized, jobSeekerGetAllApplications)
router.get('/employer/getall', isAuthorized, employerGetAllApplications)
router.post('/post', isAuthorized, postApplication)
router.delete('/delete/:id', isAuthorized, jobSeekerDeleteApplication)

export default router;