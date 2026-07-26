import API from './api.js'

// POST user login
export const loginUser = (data) =>
    API.post('/auth/login', data)

// POST user registration
export const registerUser = (data) =>
    API.post('/auth/register', data)

// GET the logged-in user's own profile
export const getMyProfile = () =>
    API.get('/auth/me')

// PUT change password (requires the logged-in user's token)
export const changePassword = (data) =>
    API.put('/auth/change-password', data)

// Clear the session and return to login
export const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
}
