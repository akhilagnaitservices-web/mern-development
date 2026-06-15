import API from './api.js'

// Get banner for a specific page
// pageName examples: 'about', 'events', 'gallery', 'contact', 'membership'
export const getPageBanner = (pageName) => API.get(`/page-banners/page/${pageName}`)