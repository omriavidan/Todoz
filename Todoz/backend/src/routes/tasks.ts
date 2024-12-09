import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getAllTasks, createTask } from '../handlers/tasksHandler';

const tasksRoutes = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.get("/tasks", async (req, reply) => { return getAllTasks(fastify, req, reply); })

  fastify.post("/tasks", createTask);
};

export default tasksRoutes;