import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('agrismart_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('agrismart_token');
      localStorage.removeItem('agrismart_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) =>
    api.post('/auth/register', userData),
  
  getProfile: () =>
    api.get('/auth/me'),
  
  updateProfile: (updates: any) =>
    api.put('/auth/profile', updates),
  
  changePassword: (currentPassword: string, newPassword: string) =>
    api.put('/auth/change-password', { currentPassword, newPassword }),
};

// Farm API
export const farmAPI = {
  getFarms: () =>
    api.get('/farms'),
  
  getFarm: (id: string) =>
    api.get(`/farms/${id}`),
  
  createFarm: (farmData: any) =>
    api.post('/farms', farmData),
  
  updateFarm: (id: string, updates: any) =>
    api.put(`/farms/${id}`, updates),
  
  deleteFarm: (id: string) =>
    api.delete(`/farms/${id}`),
};

// Crop API
export const cropAPI = {
  getCrops: () =>
    api.get('/crops'),
  
  getCrop: (id: string) =>
    api.get(`/crops/${id}`),
  
  createCrop: (cropData: any) =>
    api.post('/crops', cropData),
  
  updateCrop: (id: string, updates: any) =>
    api.put(`/crops/${id}`, updates),
  
  addActivity: (id: string, activity: any) =>
    api.post(`/crops/${id}/activities`, activity),
  
  deleteCrop: (id: string) =>
    api.delete(`/crops/${id}`),
};

// IoT API
export const iotAPI = {
  getDevices: () =>
    api.get('/iot'),
  
  getDevice: (id: string) =>
    api.get(`/iot/${id}`),
  
  createDevice: (deviceData: any) =>
    api.post('/iot', deviceData),
  
  updateDevice: (id: string, updates: any) =>
    api.put(`/iot/${id}`, updates),
  
  addReading: (id: string, reading: any) =>
    api.post(`/iot/${id}/readings`, reading),
  
  getReadings: (id: string, params?: any) =>
    api.get(`/iot/${id}/readings`, { params }),
  
  addAlert: (id: string, alert: any) =>
    api.post(`/iot/${id}/alerts`, alert),
  
  deleteDevice: (id: string) =>
    api.delete(`/iot/${id}`),
};

// Inventory API
export const inventoryAPI = {
  getItems: (params?: any) =>
    api.get('/inventory', { params }),
  
  getItem: (id: string) =>
    api.get(`/inventory/${id}`),
  
  createItem: (itemData: any) =>
    api.post('/inventory', itemData),
  
  updateItem: (id: string, updates: any) =>
    api.put(`/inventory/${id}`, updates),
  
  addTransaction: (id: string, transaction: any) =>
    api.post(`/inventory/${id}/transactions`, transaction),
  
  getLowStockAlerts: () =>
    api.get('/inventory/alerts/low-stock'),
  
  deleteItem: (id: string) =>
    api.delete(`/inventory/${id}`),
};

// Weather API
export const weatherAPI = {
  getCurrentWeather: (params?: any) =>
    api.get('/weather', { params }),
  
  getHistoricalWeather: (params?: any) =>
    api.get('/weather/historical', { params }),
};

// Market API
export const marketAPI = {
  getPrices: (params?: any) =>
    api.get('/market/prices', { params }),
  
  getBuyers: (params?: any) =>
    api.get('/market/buyers', { params }),
  
  getAnalysis: (params?: any) =>
    api.get('/market/analysis', { params }),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (params?: any) =>
    api.get('/analytics/dashboard', { params }),
  
  getCropAnalytics: (params?: any) =>
    api.get('/analytics/crops', { params }),
  
  getFinancialAnalytics: (params?: any) =>
    api.get('/analytics/financial', { params }),
  
  generateReport: (reportData: any) =>
    api.post('/analytics/reports', reportData),
  
  configureAlert: (alertData: any) =>
    api.post('/analytics/alerts', alertData),
  
  setTarget: (targetData: any) =>
    api.post('/analytics/targets', targetData),
};

// Community API
export const communityAPI = {
  getPosts: (params?: any) =>
    api.get('/community/posts', { params }),
  
  getPost: (id: string) =>
    api.get(`/community/posts/${id}`),
  
  createPost: (postData: any) =>
    api.post('/community/posts', postData),
  
  likePost: (id: string) =>
    api.post(`/community/posts/${id}/like`),
  
  addReply: (id: string, reply: any) =>
    api.post(`/community/posts/${id}/replies`, reply),
  
  getExperts: () =>
    api.get('/community/experts'),
};

// Admin API
export const adminAPI = {
  getDashboard: () =>
    api.get('/admin/dashboard'),
  
  getUsers: (params?: any) =>
    api.get('/admin/users', { params }),
  
  updateUser: (id: string, updates: any) =>
    api.put(`/admin/users/${id}`, updates),
  
  deactivateUser: (id: string) =>
    api.delete(`/admin/users/${id}`),
  
  getAnalytics: (params?: any) =>
    api.get('/admin/analytics', { params }),
  
  moderatePost: (id: string, moderation: any) =>
    api.put(`/admin/community/posts/${id}/moderate`, moderation),
};

export default api;