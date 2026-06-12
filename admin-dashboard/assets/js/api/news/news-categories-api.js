const NEWS_CATEGORIES_API =
`${APP_CONFIG.API_BASE_URL}/news-categories`;



async function getNewsCategories() {

    return axios.get(
        NEWS_CATEGORIES_API
    );

}



async function getNewsCategoryById(id) {

    return axios.get(
        `${NEWS_CATEGORIES_API}/${id}`
    );

}



async function createNewsCategory(data) {

    return axios.post(
        NEWS_CATEGORIES_API,
        data
    );

}



async function updateNewsCategory(
    id,
    data
) {

    return axios.put(
        `${NEWS_CATEGORIES_API}/${id}`,
        data
    );

}



async function deleteNewsCategory(id) {

    return axios.delete(
        `${NEWS_CATEGORIES_API}/${id}`
    );

}