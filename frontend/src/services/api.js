import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data)
}

export const sweetsAPI = {
  getAll: () => api.get('/api/sweets'),
  search: (params) => api.get('/api/sweets/search', { params }),
  create: (data) => api.post('/api/sweets', data),
  update: (id, data) => api.put(`/api/sweets/${id}`, data),
  delete: (id) => api.delete(`/api/sweets/${id}`),
  purchase: (id, quantity = 1) => api.post(`/api/sweets/${id}/purchase`, { quantity }),
  restock: (id, quantity) => api.post(`/api/sweets/${id}/restock`, { quantity })
}

export default api

