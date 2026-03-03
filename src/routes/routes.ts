import express from "express"
import { createStudent, getAllStudents } from "../controller/controlUsers";

export const router = express.Router();

router.get("/students", getAllStudents);
router.post("/student", createStudent)