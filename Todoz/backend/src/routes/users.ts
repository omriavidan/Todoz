import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getAllUsers, createUser } from '../handlers/userHandler'

const usersRoutes = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.get("/users", async (req, reply) => { return getAllUsers(fastify, req, reply); })
  fastify.post("/users", createUser);
};

export default usersRoutes;