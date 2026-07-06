import API from './api.js'

export const getGothras = (params = {}) =>
    API.get('/gothras', { params })

export const getGothraById = (id) =>
    API.get(`/gothras/${id}`)