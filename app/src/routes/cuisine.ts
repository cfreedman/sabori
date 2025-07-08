import { FastifyInstance } from "fastify";

async function cuisineRoutes(fastify: FastifyInstance) {
  fastify.get("/cuisines", async (request, reply) => {});
}
