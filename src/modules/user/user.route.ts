import { FastifyInstance } from 'fastify'
import registerUserHandler from './user.controller'

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/', registerUserHandler)
}

export default userRoutes