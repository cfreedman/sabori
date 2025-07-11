"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const db_1 = __importDefault(require("./plugins/db"));
const app = (0, fastify_1.default)({ logger: true });
app.register(db_1.default);
exports.default = app;
