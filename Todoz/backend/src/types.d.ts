import "@fastify/mongodb";
import { FastifyMongoNestedObject, FastifyMongoObject } from "@fastify/mongodb";
import '@fastify/env';

declare module "fastify" {
  interface FastifyInstance {
    mongo: FastifyMongoObject & FastifyMongoNestedObject
  }
}

interface EnvConfig {
  PORT: number;
  MONGO_URL: string;
  NODE_ENV: string;
}