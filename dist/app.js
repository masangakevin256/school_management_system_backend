"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const eventLogger_1 = require("./middleware/eventLogger");
const routes_1 = require("./routes/routes");
exports.app = (0, express_1.default)();
//custom middlewares
exports.app.use(eventLogger_1.logger);
//in built middle wares
exports.app.use(express_1.default.json());
exports.app.use("/api", routes_1.router);
