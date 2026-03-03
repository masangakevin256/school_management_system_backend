import bcrypt from "bcrypt"
import { pool } from "../model/connectPostgres"
import express, {Request, Response} from "express"
import { Student } from "../types/types"
import { studentSchema } from "../userSchemas/schema"

export const getAllStudents = async (req: Request, res: Response) => {
    try{
       const results = await pool.query(
            `SELECT * FROM students`
       ) 
       res.status(200).json(results.rows)
    }catch(err: any){
        res.status(500).json({
            error: err.message
        })
        console.log(err)
    }
}

//check interface Student

// const student: Student =  {
//     name: "masanga kevin",
//     email: 1,
//     password: 1,
//     phone: 1,
//     regNo: 1
// }
export const createStudent = async (req: Request, res: Response) => {
  try {
    // Destructure request body
    const { name, email, password, phone, regNo } = req.body  as Partial<Student>;

    // Basic validation
    if (!name || !email || !password || !phone || !regNo) {
      return res.status(400).json({ message: "All fields are required." });
    }
    //validate user input
    const { error } = studentSchema(req.body);
    if (error) {
      console.log(error)
      return res.status(400).json({ message: error.details[0].message });
      
    }

    // Check if student already exists
    const existing = await pool.query(
      "SELECT * FROM students WHERE email = $1 OR reg_no = $2",
      [email, regNo]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "Student already exists." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert into PostgreSQL
    const result = await pool.query(
      `INSERT INTO students (name, email, password, phone, reg_no, role)
       VALUES ($1, $2, $3, $4, $5, 'student') RETURNING *`,
      [name, email, hashedPassword, phone, regNo]
    );

    const newStudent = result.rows[0];

    // Respond with created student (omit password)
    delete newStudent.password;

    return res.status(201).json({
      message: "Student created successfully.",
      student: newStudent
    });

  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};