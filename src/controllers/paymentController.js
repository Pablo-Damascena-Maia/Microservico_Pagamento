import * as service from '../services/paymentService.js'

export const getAll = async (req, reply) => {
  return await service.getAllPayments()
}

export const getById = async (req, reply) => {
  return await service.getPaymentById(req.params.id)
}

export const getByOrder = async (req, reply) => {
  return await service.getByOrder(req.params.orderId)
}

export const getByStatus = async (req, reply) => {
  return await service.getByStatus(req.params.status)
}

export const create = async (req, reply) => {
  return await service.createPayment(req.body)
}

export const update = async (req, reply) => {
  return await service.updatePayment(req.params.id, req.body)
}