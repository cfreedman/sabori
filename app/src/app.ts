import Fastify from "fastify";

import postgresConnector from "./plugins/db";

const app = Fastify({ logger: true });

app.register(postgresConnector);

export default app;
