import matrimonyApi from './matrimonyApi.js'

// POST matrimony registration
export const registerMatrimony = (data) =>
    matrimonyApi.post('/registration', data)
