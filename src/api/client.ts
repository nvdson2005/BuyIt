import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: `http://localhost:3001/api`,
  timeout: 10000,
  // headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
})

export default apiClient
