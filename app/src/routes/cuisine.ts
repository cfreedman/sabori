import { FastifyInstance } from "fastify";
import { getAllCuisines, getCuisineById } from "../services/cuisineService";

async function cuisineRoutes(fastify: FastifyInstance) {
  fastify.get("/cuisines", async (request, reply) => {
    const cuisines = await getAllCuisines(fastify);

    reply.send(cuisines);
  });

  fastify.get<{ Params: { cuisineId: number } }>(
    "/cuisines/:cuisineId",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            cuisineId: { type: "integer" },
          },
          required: ["cuisineId"],
        },
      },
    },
    async (request, reply) => {
      const { cuisineId } = request.params;
      const cuisine = await getCuisineById(fastify, cuisineId);

      reply.send(cuisine);
    }
  );
}
