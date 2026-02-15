import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const ACCESS_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const authApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (refresh token)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

        if (status === 401 && refreshToken && !originalRequest?._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await authApi.post('/auth/refresh', { refreshToken });
                const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data || {};

                if (accessToken) {
                    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }
                if (newRefreshToken) {
                    localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
                }

                return api(originalRequest);
            } catch {
                localStorage.removeItem(USER_KEY);
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(REFRESH_TOKEN_KEY);
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }

        if (status === 401) {
            localStorage.removeItem(USER_KEY);
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            window.location.href = '/login';
        }

        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export const authService = {
    login: (data: any) => api.post('/auth/login', data),
    register: (data: any) => api.post('/auth/register', data),
    refresh: (refreshToken: string) => authApi.post('/auth/refresh', { refreshToken }),
    logout: () => api.post('/auth/logout'),
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
