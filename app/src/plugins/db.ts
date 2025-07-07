import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { Pool } from "pg";

const connectionString = "postgres://postgres:postgres@db:5432/sabori";

declare module "fastify" {
  interface FastifyInstance {
    pg: Pool;
  }
}

async function postgresConnector(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const pool = new Pool({
    connectionString: process.env.DATABSE_URL || connectionString,
  });

  fastify.decorate("pg", pool);

  fastify.addHook("onClose", async () => {
    await pool.end();
  });

  fastify.log.info("PostgreSQL pool created and connected.");
}

export default fastifyPlugin(postgresConnector);
