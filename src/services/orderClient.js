import axios from 'axios'

const api = axios.create({
  baseURL: process.env.ORDER_SERVICE_URL
})

export const updateOrderStatus = async (orderId, status) => {
  return await api.patch(`/orders/${orderId}/status`, { status })
}

export const getOrderById = async (orderId) => {
  return await api.get(`/orders/${orderId}`)
}