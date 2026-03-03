"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudent = exports.getAllStudents = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const connectPostgres_1 = require("../model/connectPostgres");
const getAllStudents = async (req, res) => {
    try {
        const results = await connectPostgres_1.pool.query(`SELECT * FROM students`);
        res.status(200).json(results.rows);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
        console.log(err);
    }
};
exports.getAllStudents = getAllStudents;
const createStudent = async (req, res) => {
    try {
        // Destructure request body
        const { name, email, password, phone, regNo } = req.body;
        // Basic validation
        if (!name || !email || !password || !phone || !regNo) {
            return res.status(400).json({ message: "All fields are required." });
        }
        // Check if student already exists
        const existing = await connectPostgres_1.pool.query("SELECT * FROM students WHERE email = $1 OR reg_no = $2", [email, regNo]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ message: "Student already exists." });
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Insert into PostgreSQL
        const result = await connectPostgres_1.pool.query(`INSERT INTO students (name, email, password, phone, reg_no, role)
       VALUES ($1, $2, $3, $4, $5, 'student') RETURNING *`, [name, email, hashedPassword, phone, regNo]);
        const newStudent = result.rows[0];
        // Respond with created student (omit password)
        delete newStudent.password;
        return res.status(201).json({
            message: "Student created successfully.",
            student: newStudent
        });
    }
    catch (error) {
        console.error("Error creating student:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
exports.createStudent = createStudent;
