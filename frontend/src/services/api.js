import axios from "axios";

// Check if the environment variable exists
const API_URL = import.meta.env.VITE_API_URL;

console.log("API URL:", API_URL);

if (!API_URL) {
    console.error(
        " VITE_API_URL is not defined. Please check your .env file."
    );
}

const API = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        // Let auth pages (login/register) handle their own 401s inline,
        // instead of force-redirecting and reloading the page.
        const isAuthRequest = (error.config?.url || "").includes("/auth/");

        if (error.response?.status === 401 && !isAuthRequest) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;