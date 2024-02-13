import express from 'express'
import { loginUser, registerUser } from '../controllers/users.js';
import { checkEmail } from '../middlewares/checkEmail.js';

const userRouter = express.Router();

userRouter.get("/", checkEmail, loginUser)
userRouter.post("/", checkEmail, registerUser)

export default userRouter;