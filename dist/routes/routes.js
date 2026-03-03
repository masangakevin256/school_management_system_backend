"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controlUsers_1 = require("../controller/controlUsers");
exports.router = express_1.default.Router();
exports.router.get("/students", controlUsers_1.getAllStudents);
exports.router.post("/student", controlUsers_1.createStudent);
