import API from './api.js'

export const getNewsCategories = (params = {}) =>
    API.get('/news-categories', { params })

export const getNews = (params = {}) =>
    API.get('/news', { params })

export const getNewsBySlug = (slug) =>
    API.get(`/news/slug/${slug}`)

export const getNewsById = (id) =>
    API.get(`/news/${id}`)

export const getPopularNews = () =>
    API.get('/news/popular')