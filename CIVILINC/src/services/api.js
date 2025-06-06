import axios from 'axios';
import io from 'socket.io-client';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Mock data for development
const mockProjects = [
  {
    id: 1,
    title: 'Road Widening Project',
    department: 'Roads & Infrastructure',
    status: 'in-progress',
    budget: 2500000,
    start_date: '2024-02-01',
    end_date: '2024-06-30',
    description: 'Widening of main road in Sector 15',
    assigned_engineers: ['John Doe', 'Jane Smith']
  },
  {
    id: 2,
    title: 'Water Pipeline Maintenance',
    department: 'Water Supply',
    status: 'planned',
    budget: 1500000,
    start_date: '2024-03-01',
    end_date: '2024-04-30',
    description: 'Maintenance of water pipelines in Sector 12',
    assigned_engineers: ['Mike Johnson']
  }
];

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // For development, return mock data if API is not available
    if (error.message === 'Network Error') {
      // Check if it's a projects endpoint
      if (error.config.url.includes('/projects')) {
        return Promise.resolve({ data: mockProjects });
      }
    }
    return Promise.reject(error);
  }
);

const socket = io(process.env.VUE_APP_WS_URL || 'http://localhost:3000');

export const wsService = {
  connect() {
    socket.connect();
  },
  
  disconnect() {
    socket.disconnect();
  },
  
  onComplaintUpdate(callback) {
    socket.on('complaint:update', callback);
  },
  
  onComplaintCreated(callback) {
    socket.on('complaint:created', callback);
  }
};

export default api; 