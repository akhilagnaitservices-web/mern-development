import axios from 'axios';

// ─────────────────────────────────────────
// BASE API CONFIGURATION
// All API calls use this instance
// Change BASE_URL here to switch environments
// ─────────────────────────────────────────
let currentBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// If Vite wasn't restarted, it might still have the old IP in memory. Force it to localhost.
if (currentBaseUrl.includes('145.223.18.188')) {
    currentBaseUrl = 'http://localhost:5000/api';
}

const API = axios.create({
    baseURL: currentBaseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─────────────────────────────────────────
// REQUEST INTERCEPTOR
// Automatically adds auth token to every request
// ─────────────────────────────────────────
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─────────────────────────────────────────
// RESPONSE INTERCEPTOR
// Handles token expiry globally
// ─────────────────────────────────────────
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;