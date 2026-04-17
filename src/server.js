import Fastify from 'fastify'
import paymentRoutes from './routes/paymentRoutes.js'

const fastify = Fastify()

fastify.register(paymentRoutes)

fastify.listen({ port: 3003 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Servidor rodando em ${address}`)
})