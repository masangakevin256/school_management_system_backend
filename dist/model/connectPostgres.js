"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "schooldb",
    password: "masanga@kevin",
    port: 5432,
});
console.log(process.env.PASSWORD || "Undefined");
