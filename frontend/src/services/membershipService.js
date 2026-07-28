import API from './api.js'

// POST membership registration (multipart — includes photo)
// Content-Type is intentionally left unset so the browser can generate
// the correct multipart boundary itself — setting it manually breaks the upload.
export const registerMembership = (formData) =>
    API.post('/membership/auth/register', formData, {
        headers: { 'Content-Type': undefined },
    })
