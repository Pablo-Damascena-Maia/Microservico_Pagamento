import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004'
})

export const updateOrderStatus = async (orderId, status) => {
  return await api.patch(`/orders/${orderId}/status`, { status })
}