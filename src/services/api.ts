import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState();
    if (user && (user as any).token) {
      config.headers.Authorization = `Bearer ${(user as any).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
