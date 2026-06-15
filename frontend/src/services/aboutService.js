import API from './api.js'

export const getAboutSamiti = () => API.get('/about-samiti')
export const getPresidentMsg = () => API.get('/president-message')
export const getHeritageFeatures = () => API.get('/heritage-features')
export const getCoreValues = () => API.get('/core-values')
export const getLeadershipMembers = () => API.get('/leadership-members')