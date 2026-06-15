import API from './api.js'

export const getBanners         = () => API.get('/banners')
export const getFlashNews       = () => API.get('/flash-news')
export const getPresidentMsg    = () => API.get('/president-message')
export const getAboutSamiti     = () => API.get('/about-samiti')
export const getQuickServices   = () => API.get('/quick-services')
export const getEvents          = () => API.get('/events')
export const getGallery         = () => API.get('/gallery')