import { PrismaClient } from '@prisma/client'
import { updateOrderStatus } from './orderClient.js'

const prisma = new PrismaClient()

export const getAllPayments = () => {
  return prisma.payment.findMany()
}

export const getPaymentById = (id) => {
  return prisma.payment.findUnique({
    where: { id: Number(id) }
  })
}

export const getByOrder = (orderId) => {
  return prisma.payment.findMany({
    where: { orderId: Number(orderId) }
  })
}

export const getByStatus = (status) => {
  return prisma.payment.findMany({
    where: { status }
  })
}

export const createPayment = async (data) => {
  const payment = await prisma.payment.create({ data })

  try {
    await updateOrderStatus(data.orderId, 'PENDING')
  } catch (error) {
    console.log('Erro ao comunicar com pedidos')
  }

  return payment
}

export const updatePayment = async (id, data) => {
  const payment = await prisma.payment.update({
    where: { id: Number(id) },
    data
  })

  if (data.status) {
    try {
      await updateOrderStatus(payment.orderId, data.status)
    } catch (error) {
      console.log('Erro ao comunicar com pedidos')
    }
  }

  return payment
}