
import { FastifyRequest, FastifyReply } from 'fastify'
import { createUserInput } from './user.schema'
import { createUser } from './user.service'

async function registerUserHandler(
  request: FastifyRequest<{
    Body: createUserInput
  }>,
  reply: FastifyReply) {
  const body = request.body

  try {
    const user = await createUser(body)

    return reply.code(201).send(user)

  } catch (error) {
    console.error(error)
    return reply.code(500).send(error)
  }
}

export default registerUserHandler