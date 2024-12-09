import { FastifyRequest, FastifyReply } from "fastify";

export const getAllUsers = async (fastify: unknown, req: FastifyRequest, reply: FastifyReply) => {
  return reply.send([{ id: 1, name: "User1" }, { id: 2, name: "User2" }]);
};

export const createUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name } = req.body as { name: string };
  return reply.code(201).send({ id: Date.now(), name });
};