import Fastify from "fastify";
import tasksRoutes from "./routes/tasks";
import usersRoutes from "./routes/users";
import dbConnector from "./plugins/db";
import fastifyMongo from '@fastify/mongodb';
import fastifyenv, { fastifyEnv } from '@fastify/env';
import { EnvConfig } from "./types";

const server = Fastify({ logger: true });


const envSchema = {
  type: "object",
  required: ["PORT", "MONGO_URL", "NODE_ENV"],
  properties: {
    PORT: { type: "number", default: 3000 },
    MONGO_URL: { type: "string" },
    NODE_ENV: { type: "string", default: "development" },
  },
};

server.register(fastifyEnv, {
  schema: envSchema,
  dotenv: true, // Load variables from the .env file
  data: process.env,
});

server.after((err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(process.env.MONGO_URL)


  // Access environment variables safely
  const env: EnvConfig = server.getEnvs();
  const { MONGO_URL, NODE_ENV, PORT } = env

  // Register MongoDB plugin
  server.register(fastifyMongo, {
    url: MONGO_URL,
    forceClose: true,
  });

  server.register(tasksRoutes, { prefix: "/api" });
  server.register(usersRoutes, { prefix: "/api" });

  // Start the server
  server.get("/", async (request, reply) => {
    return { message: "Welcome to Fastify!" };
  })


  // server.listen({ port: PORT }, (err) => {
  //   if (err) {
  //     server.log.error(err);
  //     process.exit(1);
  //   }
  //   console.log(`Server running at http://localhost:${PORT}`);
  // });
});

const start = async () => {
  try {
      const port = 3000;
      await server.listen({ port });
      console.log(`Server listening at http://localhost:${port}`);
  } catch (err) {
      server.log.error(err);
      process.exit(1);
  }
};

start()

// Register


// server.register(dbConnector);


// // Default Route


// // Start the Server
// const start = async () => {
//     try {
//         const port = 3000;
//         await server.listen({ port });
//         console.log(`Server listening at http://localhost:${port}`);
//     } catch (err) {
//         server.log.error(err);
//         process.exit(1);
//     }
// };
