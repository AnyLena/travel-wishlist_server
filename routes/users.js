import express from 'express'
import { loginUser, registerUser, getUser } from '../controllers/users.js';
import { checkEmail } from '../middlewares/checkEmail.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const userRouter = express.Router();

userRouter.post("/login", loginUser)
userRouter.get("/user", verifyToken, getUser)
userRouter.post("/", checkEmail, registerUser)

export default userRouter;