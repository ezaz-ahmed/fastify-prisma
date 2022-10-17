import fastify from 'fastify'
import userRoutes from './modules/user/user.route'

const app = fastify()

app.get('/healthcheck', async () => {
  return { status: 'OK' }
})

async function main() {
  app.register(userRoutes, { prefix: 'api/users' })

  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
    console.log(`Server is runnig at port: 3000`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

main()
