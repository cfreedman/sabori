import { FastifyInstance } from "fastify";

async function getAllIngredients(fastify: FastifyInstance) {
  const result = await fastify.pg.query("SELECT * FROM ingredients");

  return result.rows;
}

async function getIngredientById(fastify: FastifyInstance, id: number) {
  const result = await fastify.pg.query(
    "SELECT * FROM ingredients WHERE id = $1",
    [id]
  );

  return result.rows;
}

async function updateIngredient(fastify: FastifyInstance) {
  return;
}
