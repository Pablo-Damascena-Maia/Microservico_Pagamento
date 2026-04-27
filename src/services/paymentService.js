import { PrismaClient } from '@prisma/client'
import { updateOrderStatus, getOrderById } from './orderClient.js'

const prisma = new PrismaClient()

export const getAllPayments = async () => {
  return await prisma.payment.findMany()
}

export const getPaymentById = async (id) => {
  return await prisma.payment.findUnique({
    where: { id: Number(id) }
  })
}

export const getByOrder = async (orderId) => {
  return await prisma.payment.findMany({
    where: { orderId: Number(orderId) }
  })
}

export const getByStatus = async (status) => {
  return await prisma.payment.findMany({
    where: { status }
  })
}

export const createPayment = async (data) => {
  try {
    const orderResponse = await getOrderById(data.orderId)

    if (!orderResponse.data) {
      throw new Error('Pedido não encontrado')
    }
  } catch (error) {
    throw new Error('Erro ao buscar pedido')
  }

  const payment = await prisma.payment.create({
    data: {
      orderId: data.orderId,
      userId: data.userId,
      amount: data.amount,
      status: data.status,
      paymentMethod: data.paymentMethod
    }
  })

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
    data: {
      orderId: data.orderId,
      userId: data.userId,
      amount: data.amount,
      status: data.status,
      paymentMethod: data.paymentMethod
    }
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