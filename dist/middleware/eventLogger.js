"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.logEvents = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
// import {v4 : uuid} from "uuid"
const date_fns_1 = require("date-fns");
const logEvents = async (message, logFile) => {
    const logDir = path_1.default.join(__dirname, "..", "..", "logs");
    if (!fs_1.default.existsSync(logDir)) {
        await promises_1.default.mkdir(logDir);
    }
    const logTime = (0, date_fns_1.format)(new Date(), "yyy/MM/dd \t HH:mm:ss");
    const logMessage = `${logTime}: ${message} \n`;
    await promises_1.default.appendFile(path_1.default.join(logDir, `${logFile}`), logMessage);
};
exports.logEvents = logEvents;
const logger = async (req, res, next) => {
    const message = `${req.method}: ${req.headers.origin || "No origin"}: ${req.url}`;
    (0, exports.logEvents)(message, "logs.txt").catch(err => console.log(err));
    console.log(message);
    next();
};
exports.logger = logger;
