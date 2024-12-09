import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export const getAllTasks = async (fastify: FastifyInstance, req: FastifyRequest, reply: FastifyReply,) => {
  // Example response
  try {
    const collection = fastify.mongo.db?.collection("tasks");
    const tasks = await collection?.insertOne({ title: "Task 1" })
    return reply.send(tasks)
  } catch (err) {
    req.server.log.error(err);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const createTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { title } = req.body as { title: string };
  // Example response: Return the created task
  return reply.code(201).send({ id: Date.now(), title });
};