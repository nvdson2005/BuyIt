import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  // baseURL: `http://localhost:3001/api`,
  // baseURL: 'https://buy-it-backend-nine.vercel.app/api',
  baseURL: 'https://buyit-backend-production.up.railway.app/api',
  timeout: 20000,
  // headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
})

export default apiClient
