import * as controller from '../controllers/paymentController.js'

export default async function routes(fastify, options) {
  fastify.get('/payments', controller.getAll)
  fastify.get('/payments/:id', controller.getById)
  fastify.get('/payments/order/:orderId', controller.getByOrder)
  fastify.get('/payments/status/:status', controller.getByStatus)
  fastify.post('/payments', controller.create)
  fastify.put('/payments/:id', controller.update)
}