import Fastify from "fastify";
import postgres from "@fastify/postgres";

const fastify = Fastify({ logger: true });

fastify.register(postgres, {
  connectionString: "postgres://user:password@host:port/database",
});

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log(err);
    process.exit(1);
  }
};

start();
