import Fastify from "fastify";

import userRoutes from "./modules/user/user.route";

const server = Fastify()

server.get('/healthcheck', async () => {
  return { status: "OK" }
})

async function main() {

  server.register(userRoutes, {
    prefix: 'api/users'
  })

  try {
    await server.listen(3000, "0.0.0.0")

    console.log(`Server ready at localhost:3000`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()