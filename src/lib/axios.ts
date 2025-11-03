// lib/axios.ts
import axios from 'axios'
import qs from 'qs';
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' }),
})

export default api
