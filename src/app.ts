import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt from '@fastify/jwt'

import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

export const fastify = Fastify()

fastify.register(fjwt, {
  secret: "supersecret"
})

fastify.decorate("authenticated", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.send(error)
  }
})

fastify.get('/healthcheck', async () => {
  return { status: "OK" }
})

async function main() {

  for (const schema of userSchemas) {
    fastify.addSchema(schema)
  }

  fastify.register(userRoutes, {
    prefix: 'api/users'
  })

  fastify.listen({ port: 3000, host: '0.0.0.0' })
    .then((address) => console.log(`server listening on ${address}`))
    .catch(err => {
      console.log('Error starting server:', err)
      process.exit(1)
    })
}

main()