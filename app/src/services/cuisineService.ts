import { FastifyInstance } from "fastify";

async function getAllCuisines(fastify: FastifyInstance) {
  const results = await fastify.pg.query("SELECT * FROM cuisines");

  return results.rows;
}

async function getCuisineById(fastify: FastifyInstance, id: number) {
  const results = await fastify.pg.query(
    "SELECT * FROM cuisines WHERE id = $1",
    [id]
  );

  return results.rows;
}
