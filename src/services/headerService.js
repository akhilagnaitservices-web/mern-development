import API from './api.js'

// ─────────────────────────────────────────
// HEADER SERVICE
// All API calls for navbar and footer data
// ─────────────────────────────────────────

// GET site header (logo, name, contact, copyright)
export const getHeader = async () => {
    const response = await API.get('/header')
    return response.data
}

// GET social media links
export const getSocialMediaLinks = async () => {
    const response = await API.get('/header/social-media')
    return response.data
}

// GET footer quick links
export const getFooterLinks = async () => {
    const response = await API.get('/header/footer-links')
    return response.data
}