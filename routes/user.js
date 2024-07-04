import express from 'express';
import { getUser, login, logout, register } from '../controllers/user.js';
import { errorMiddleware } from '../middlewares/error.js';
import { isAuthorized } from '../middlewares/Auth.js';
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthorized, logout)
router.get("/getUser", isAuthorized, getUser)

// Move errorMiddleware down to catch errors from the routes
router.use(errorMiddleware)

export default router;
