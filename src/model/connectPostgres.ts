import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "schooldb", 
  password: "masanga@kevin",
  port: 5432,
});


console.log(process.env.PASSWORD || "Undefined")