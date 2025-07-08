import { FastifyInstance } from "fastify";

interface CreateIngredient {
  name: string;
  cuisines: string[];
}

export async function getAllIngredients(fastify: FastifyInstance) {
  const result = await fastify.pg.query("SELECT * FROM ingredients");

  return result.rows;
}

export async function getIngredientById(fastify: FastifyInstance, id: number) {
  const { rows } = await fastify.pg.query(
    "SELECT * FROM ingredients WHERE id = $1",
    [id]
  );

  return rows.length > 0 ? rows[0] : null;
}

export async function updateIngredient(fastify: FastifyInstance) {
  return;
}

export async function getOrCreateIngredient(
  fastify: FastifyInstance,
  name: string
) {
  const { rows } = await fastify.pg.query(
    "INSERT INTO ingredients (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING *",
    [name]
  );

  if (rows.length > 0) return rows[0];

  const selectResult = await fastify.pg.query(
    "SELECT * FROM ingredients WHERE name = $1",
    [name]
  );

  return selectResult.rows[0];
}

export async function createStoreIngredientBridge(
  fastify: FastifyInstance,
  ingredientId: number,
  storeId: number,
  lastSeen: Date | null = null,
  lastSeenBy: string | null = null
) {
  await fastify.pg.query(
    "INSERT INTO stores_ingredients_bridge (store_id, ingredient_id, last_seen, last_seen_by) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING",
    [storeId, ingredientId, lastSeen, lastSeenBy]
  );
}

export async function updateStoreIngredientBridge(
  fastify: FastifyInstance,
  storeId: number,
  ingredientId: number,
  lastSeen: Date | null = null,
  lastSeenBy: string | null = null
) {
  await fastify.pg.query(
    "UPDATE store_ingredients_bridge \
    SET last_seen = CURRENT_TIMESTAMP, last_seen_by = $4 \
    WHERE store_id = $1 AND ingredient_id = $2;",
    [storeId, ingredientId, lastSeen, lastSeenBy]
  );
}

export async function createCuisineIngredientBridge(
  fastify: FastifyInstance,
  ingredientId: number,
  cuisineIds: number[]
) {
  await fastify.pg.query(
    "INSERT INTO cuisines_ingredients_bridge (ingredient_id, cuisine_id) \
      SELECT $1, c.cuisine_id \
      FROM UNNEST($2::int[]) AS c(cuisine_id) \
      WHERE NOT EXISTS ( \
        SELECT 1 \
        FROM cuisines_ingredients_bridge ci \
        WHERE ci.ingredient_id = $1 AND ci.cuisine_id = c.cuisine_id \
      );",
    [ingredientId, cuisineIds]
  );
}
