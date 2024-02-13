import express from 'express'
import { getStudents, postStudent, putStudent, putManyStudents, putStudentCountry } from '../controllers/students.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const studentRouter = express.Router()

studentRouter.get("/", getStudents)
studentRouter.post("/",verifyToken, postStudent)
studentRouter.put("/:id",verifyToken, putStudent)
studentRouter.put("/firstname/:old_first_name",verifyToken, putManyStudents)
studentRouter.put("/:id/:code", verifyToken,putStudentCountry)


export default studentRouter