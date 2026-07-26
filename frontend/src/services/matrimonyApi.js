import axios from 'axios'

const MATRIMONY_API_URL = import.meta.env.VITE_MATRIMONY_API_URL

if (!MATRIMONY_API_URL) {
    console.error(
        '❌ VITE_MATRIMONY_API_URL is not defined. Please check your .env file.'
    )
}

// Independent axios instance for the Matrimony application.
// Matrimony has its own separate authentication system (session-cookie based).
// This instance intentionally has no Authorization header and no interceptors
// shared with api.js, so the Membership and Matrimony logins never mix.
const matrimonyApi = axios.create({
    baseURL: MATRIMONY_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default matrimonyApi
