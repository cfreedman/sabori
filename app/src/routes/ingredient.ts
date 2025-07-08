import { FastifyInstance } from "fastify";

import {
  getAllIngredients,
  getIngredientById,
} from "../services/ingredientService";

async function ingredientRoutes(fastify: FastifyInstance) {
  fastify.get("/ingredients", async (request, reply) => {
    const ingredients = await getAllIngredients(fastify);

    reply.send(ingredients);
  });

  fastify.get<{ Params: { ingredientId: number } }>(
    "/ingredients/:ingredientId",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            ingredientId: { type: "integer" },
          },
          required: ["ingredientId"],
        },
      },
    },
    async (request, reply) => {
      const { ingredientId } = request.params;

      const ingredient = await getIngredientById(
        fastify,
        ingredientId as number
      );

      reply.send(ingredient);
    }
  );
}
