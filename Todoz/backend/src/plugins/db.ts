import { MongoClient } from "mongodb";
import fp from "fastify-plugin";

const dbUrl = "mongodb://127.0.0.1:27017";
const dbName = "my-database";

async function dbConnector(fastify: any) {
  const client = new MongoClient(dbUrl);
  await client.connect();

  const db = client.db(dbName);
  fastify.decorate("mongo", { client, db });
  fastify.log.info("MongoDB connected successfully");
}

export default fp(dbConnector);