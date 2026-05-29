const BANNER_API =
`${APP_CONFIG.API_BASE_URL}/banners`;

async function getBanners() {

    return axios.get(
        BANNER_API
    );

}

async function getBannerById(id) {

    return axios.get(
        `${BANNER_API}/${id}`
    );

}

async function createBanner(formData) {

    return axios.post(
        BANNER_API,
        formData
    );

}

async function updateBanner(
    id,
    formData
) {

    return axios.put(
        `${BANNER_API}/${id}`,
        formData
    );

}

async function deleteBanner(id) {

    return axios.delete(
        `${BANNER_API}/${id}`
    );

}
