import express from 'express'
import { deleteMyJob, getAllJobs, getMyJobs, getSingleJob, postJobs, updateMyJob } from '../controllers/job.js';
import { isAuthorized } from '../middlewares/Auth.js';
const router = express.Router();



router.get('/getall', getAllJobs)
router.post('/post', isAuthorized, postJobs)
router.get('/getmyjobs', isAuthorized, getMyJobs)
router.get('/:id', isAuthorized, getSingleJob)
router.put('/updatemyjob/:id', isAuthorized, updateMyJob)
router.delete('/deletemyjob/:id', isAuthorized, deleteMyJob)


export default router;