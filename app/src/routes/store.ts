import { FastifyInstance } from "fastify";
import { getAllStores, getStoreById } from "../services/storeService";

async function storeRoutes(fastify: FastifyInstance) {
  fastify.get("/stores", async (request, reply) => {
    const stores = await getAllStores(fastify);

    reply.send(stores);
  });

  fastify.get<{ Params: { storeId: number } }>(
    "/stores/:storeId",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            storeId: { type: "integer" },
          },
          required: ["storeId"],
        },
      },
    },
    async (request, reply) => {
      const { storeId } = request.params;
      const store = await getStoreById(fastify, storeId);

      reply.send(store);
    }
  );
}
