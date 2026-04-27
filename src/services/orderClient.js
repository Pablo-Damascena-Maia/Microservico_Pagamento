import axios from 'axios'

const api = axios.create({
  baseURL: process.env.ORDER_SERVICE_URL
})

export const updateOrderStatus = async (orderId, status) => {
  return await api.patch(`/pedidos/${orderId}/status`, { status })
}

export const getOrderById = async (orderId) => {
  return await api.get(`/pedidos/${orderId}`)
}