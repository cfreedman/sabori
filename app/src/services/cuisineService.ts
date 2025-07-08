import { FastifyInstance } from "fastify";

export async function getAllCuisines(fastify: FastifyInstance) {
  const results = await fastify.pg.query("SELECT * FROM cuisines");

  return results.rows;
}

export async function getCuisineById(
  fastify: FastifyInstance,
  cuisineId: number
) {
  const results = await fastify.pg.query(
    "SELECT * FROM cuisines WHERE id = $1",
    [cuisineId]
  );

  return results.rows;
}

export async function getOrCreateCuisine(
  fastify: FastifyInstance,
  cuisine: string
) {
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
