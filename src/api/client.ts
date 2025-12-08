import router from '@/router'
import axios, { type AxiosInstance } from 'axios'
import { notify } from '@/utils/notify'
const apiClient: AxiosInstance = axios.create({
  // baseURL: `http://localhost:3001/api`,
  // baseURL: 'https://buy-it-backend-nine.vercel.app/api',
  baseURL: 'https://buyit-backend-production.up.railway.app/api',
  timeout: 20000,
  // headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('username')
      localStorage.removeItem('role')
      localStorage.removeItem('id')
      router.push('/login')
      notify('Session expired. Please login again.', 'error')
    }
    return Promise.reject(error)
  },
)
export default apiClient
