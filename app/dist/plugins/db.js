"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const pg_1 = require("pg");
const connectionString = "postgres://postgres:postgres@db:5432/sabori";
async function postgresConnector(fastify, options) {
    const pool = new pg_1.Pool({
        connectionString: process.env.DATABSE_URL || connectionString,
    });
    fastify.decorate("pg", pool);
    fastify.addHook("onClose", async () => {
        await pool.end();
    });
    fastify.log.info("PostgreSQL pool created and connected.");
}
exports.default = (0, fastify_plugin_1.default)(postgresConnector);
