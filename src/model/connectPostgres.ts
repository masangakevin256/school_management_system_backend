import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "schooldb", 
  password: process.env.PASSWORD,
  port: 5432,
});


// console.log(process.env.PASSWORD || "Undefined")