import API from './api.js'

// GET contact information
export const getContactInfo = () =>
    API.get('/contact-information')

// POST contact message
export const sendContactMessage = (data) =>
    API.post('/contact-messages', data)