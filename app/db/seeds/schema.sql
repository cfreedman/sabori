DROP DATABASE IF EXISTS sabori;

CREATE DATABASE sabori;

\c sabori;

CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS ingredients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    cuisines 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS store_ingredients_bridge (
    store_id INTEGER NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    ingredient_id INTEGER NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    PRIMARY KEY (store_id, ingredient_id),
    last_seen TIMESTAMP WITH TIME ZONE,
    last_seen_by TEXT,
);