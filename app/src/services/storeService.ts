import { FastifyInstance } from "fastify";

interface CreateStore {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface StoreData extends CreateStore {
  id: number;
  created_at: string;
}

export async function getAllStores(fastify: FastifyInstance) {
  const results = await fastify.pg.query("SELECT * FROM stores");

  return results.rows;
}

export async function getStoreById(fastify: FastifyInstance, storeId: number) {
  const results = await fastify.pg.query("SELECT * FROM stores WHERE id = $1", [
    storeId,
  ]);

  return results.rows[0];
}

export async function getOrCreateStore(
  fastify: FastifyInstance,
  storeData: CreateStore
) {
  const { name, address, latitude, longitude } = storeData;

  const { rows } = await fastify.pg.query(
    "INSERT INTO stores (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) ON CONFLICT (address) DO NOTHING RETURNING *",
    [name, address, latitude, longitude]
  );

  if (rows.length > 0) return rows[0];

  const selectResult = await fastify.pg.query(
    "SELECT * FROM stores WHERE address = $1",
    [address]
  );

  return selectResult.rows[0];
}

export async function getStoresWithIngredient(
  fastify: FastifyInstance,
  ingredientId: number
) {
  const { rows } = await fastify.pg.query(
    "SELECT * FROM stores \
    INNER JOIN stores_ingredients_bridge AS si\
    ON stores.id = si.store_id \
    WHERE si.ingredient_id = $1",
    [ingredientId]
  );

  return rows;
}

export async function getStoresWithCuisine(
  fastify: FastifyInstance,
  cuisineId: number
) {
  const { rows } = await fastify.pg.query(
    "SELECT * FROM stores \
    INNER JOIN stores_ingredients_bridge AS si \
    INNER JOIN cuisines_ingredients_bridge AS ci \
    WHERE ci.cuisine_id = $1",
    [cuisineId]
  );

  return rows;
}
