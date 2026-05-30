const FLASH_NEWS_API =
`${APP_CONFIG.API_BASE_URL}/flash-news`;

async function getFlashNews() {

    return axios.get(
        FLASH_NEWS_API
    );

}

async function getFlashNewsBySlug(slug) {

    return axios.get(
        `${FLASH_NEWS_API}/slug/${slug}`
    );

}

async function getFlashNewsById(id) {

    return axios.get(
        `${FLASH_NEWS_API}/${id}`
    );

}

async function createFlashNews(formData) {

    return axios.post(
        FLASH_NEWS_API,
        formData
    );

}

async function updateFlashNews(
    id,
    formData
) {

    return axios.put(
        `${FLASH_NEWS_API}/${id}`,
        formData
    );

}

async function deleteFlashNews(id) {

    return axios.delete(
        `${FLASH_NEWS_API}/${id}`
    );

}