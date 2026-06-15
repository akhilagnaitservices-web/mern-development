import API from './api.js'

export const getNewsCategories = (params = {}) =>
    API.get('/news-categories', { params })

export const getNews = (params = {}) =>
    API.get('/news', { params })

export const getNewsById = (id) =>
    API.get(`/news/${id}`)

export const getPopularNews = () =>
    API.get('/news/popular')