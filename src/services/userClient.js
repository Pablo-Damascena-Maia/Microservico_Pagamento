import axios from 'axios'

const api = axios.create({
  baseURL: process.env.USER_SERVICE_URL
})

export const getUserById = async (userId) => {
  return await api.get(`/interno/usuarios/${userId}`)
}