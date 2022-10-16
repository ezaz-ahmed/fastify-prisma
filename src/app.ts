import fastify from 'fastify'

const app = fastify()

app.get('/healthcheck', async () => {
  return { status: 'OK' }
})

async function main() {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
    console.log(`Server is runnig at port: 3000`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

main()
