import { FastifyInstance } from "fastify";

async function ingredientRoutes(fastify: FastifyInstance) {
  fastify.get("/ingredients", async (request, reply) => {});

  fastify.post("/ingredients", async (request, reply) => {});
}
