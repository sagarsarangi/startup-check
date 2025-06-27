
import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:8000', // FastAPI default
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens (if needed later)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API endpoints
export const startupAPI = {
  // Submit startup for analysis
  analyzeStartup: async (data: {
    name: string;
    category: string;
    description: string;
  }) => {
    const response = await api.post('/analyze-startup', data);
    return response.data;
  },

  // Get analysis results
  getResults: async (analysisId: string) => {
    const response = await api.get(`/results/${analysisId}`);
    return response.data;
  },

  // Health check endpoint
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
