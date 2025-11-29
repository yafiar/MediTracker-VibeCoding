import axios from 'axios';

// Prefer environment variable, fallback to provided Render URL
const API_URL = process.env.REACT_APP_API_URL || 'https://meditracker-backend-c0fn.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Medicine API
export const medicineAPI = {
  getAll: (params = {}) => api.get('/medicines', { params }),
  getById: (id) => api.get(`/medicines/${id}`),
  create: (formData) => api.post('/medicines', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/medicines/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/medicines/${id}`),
};

// Schedule API
export const scheduleAPI = {
  getAll: () => api.get('/schedules'),
  getByMedicine: (medicineId) => api.get(`/schedules/medicine/${medicineId}`),
  create: (data) => api.post('/schedules', data),
  update: (id, data) => api.put(`/schedules/${id}`, data),
  delete: (id) => api.delete(`/schedules/${id}`),
};

// Intake API
export const intakeAPI = {
  getAll: () => api.get('/intakes'),
  getTodayIntakes: () => api.get('/intakes/today'),
  markAsTaken: (data) => api.post('/intakes', data),
  delete: (id) => api.delete(`/intakes/${id}`),
};

export default api;
