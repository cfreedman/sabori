import app from "./src/app.js";

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log(err);
    process.exit(1);
  }
};

start();
