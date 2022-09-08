import Fastify from "fastify";

import userRoutes from "./modules/user/user.route";

const fastify = Fastify()

fastify.get('/healthcheck', async () => {
  return { status: "OK" }
})

async function main() {

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