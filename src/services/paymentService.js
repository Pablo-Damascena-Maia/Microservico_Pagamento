import { PrismaClient } from '@prisma/client'
import { getUserById } from './userClient.js'

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
    const userResponse = await getUserById(data.userId)

    if (!userResponse.data) {
      throw new Error('Usuário não encontrado')
    }
  } catch (error) {
    console.error("Erro", error.message);
    throw new Error('Erro ao buscar usuário')
  }

  return await prisma.payment.create({
    data: {
      orderId: data.orderId,
      userId: data.userId,
      amount: data.amount,
      status: data.status,
      paymentMethod: data.paymentMethod
    }
  })
}

export const updatePayment = async (id, data) => {
  return await prisma.payment.update({
    where: { id: Number(id) },
    data: {
      orderId: data.orderId,
      userId: data.userId,
      amount: data.amount,
      status: data.status,
      paymentMethod: data.paymentMethod
    }
  })
}