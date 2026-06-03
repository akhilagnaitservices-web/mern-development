const PAGE_BANNER_API =
`${APP_CONFIG.API_BASE_URL}/page-banners`;



async function getBanners() {

    return axios.get(
        PAGE_BANNER_API
    );

}



async function getBannerById(id) {

    return axios.get(
        `${PAGE_BANNER_API}/${id}`
    );

}



async function createBanner(formData) {

    return axios.post(
        PAGE_BANNER_API,
        formData
    );

}



async function updateBanner(
    id,
    formData
) {

    return axios.put(
        `${PAGE_BANNER_API}/${id}`,
        formData
    );

}



async function deleteBanner(id) {

    return axios.delete(
        `${PAGE_BANNER_API}/${id}`
    );

}