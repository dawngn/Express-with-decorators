"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER = exports.SERVER_HOST = exports.SERVER_PORT = exports.TEST = exports.DEVELOPMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DEVELOPMENT = process.env.NODE_ENV === 'development';
exports.TEST = process.env.NODE_ENV === 'test';
exports.SERVER_PORT = process.env.SERVER_PORT || 4000;
exports.SERVER_HOST = process.env.SERVER_HOST || 'localhost';
exports.SERVER = {
    SERVER_HOST: exports.SERVER_HOST,
    SERVER_PORT: exports.SERVER_PORT,
};
