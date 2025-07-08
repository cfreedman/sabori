import { FastifyInstance } from "fastify";

async function getAllStores(fastify: FastifyInstance) {
  const results = await fastify.pg.query("SELECT * FROM stores");

  return results.rows;
}

async function getStoreById(fastify: FastifyInstance, id: number) {
  const results = await fastify.pg.query("SELECT * FROM stores WHERE id = $1", [
    id,
  ]);

  return results.rows;
}
