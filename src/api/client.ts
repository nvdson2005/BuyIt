import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  // url: `http://localhost:3000/api`,
  timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
})

export default apiClient
