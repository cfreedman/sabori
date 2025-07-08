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

async function getOrCreateCuisine(fastify: FastifyInstance, cuisine: string) {
  const { rows } = await fastify.pg.query(
    "INSERT INTO cuisines (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING *",
    [cuisine]
  );

  if (rows.length > 0) return rows[0];

  const selectResult = await fastify.pg.query(
    "SELECT * FROM cuisines WHERE name = $1",
    [cuisine]
  );

  return selectResult.rows[0];
}
