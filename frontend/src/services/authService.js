import API from './api.js'

// POST membership login
export const loginUser = (data) =>
    API.post('/membership/auth/login', data)

// POST forgot password (sends reset email)
export const forgotPassword = (data) =>
    API.post('/membership/auth/forgot-password', data)

// POST reset password (with token from email)
export const resetPassword = (data) =>
    API.post('/membership/auth/reset-password', data)

// GET the logged-in user's own profile
export const getMyProfile = () =>
    API.get('/membership/auth/me')

// PUT update the logged-in user's own profile
export const updateMyProfile = (data) =>
    API.put('/membership/auth/me', data)

// PUT change password (requires the logged-in user's token)
export const changePassword = (data) =>
    API.put('/membership/auth/change-password', data)

// Clear the session and return to login
export const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
}
