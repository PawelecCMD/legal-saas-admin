import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle global errors (e.g. 401 Unauthorized)
        if (error.response?.status === 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }

        // Log errors for debugging
        console.error('API Error:', error.response?.data?.message || error.message);

        return Promise.reject(error);
    }
);

export const authService = {
    login: (data: any) => api.post('/auth/login', data),
    register: (data: any) => api.post('/auth/register', data),
    refresh: () => api.post('/auth/refresh'),
};

export const caseService = {
    getAll: () => api.get('/cases'),
    create: (data: any) => api.post('/cases', data),
    getById: (id: string) => api.get(`/cases/${id}`),
    updateStatus: (id: string, status: string) => api.patch(`/cases/${id}/status`, { status }),
};

export const aiService = {
    analyze: (data: any) => api.post('/ai/analyze', data),
    generate: (data: any) => api.post('/ai/generate', data),
};

export default api;
