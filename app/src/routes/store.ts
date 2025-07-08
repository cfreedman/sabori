import { FastifyInstance } from "fastify";

async function storeRoutes(fastify: FastifyInstance) {
  fastify.get("/stores", async (request, reply) => {});

  fastify.get("/stores/:id", async (request, reply) => {});
}
