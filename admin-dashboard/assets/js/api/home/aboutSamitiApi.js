const ABOUT_API =
`${APP_CONFIG.API_BASE_URL}/about-samiti`;

async function getAboutSamiti() {

    return axios.get(
        ABOUT_API
    );

}

async function createAboutSamiti(formData) {

    return axios.post(
        ABOUT_API,
        formData
    );

}

async function updateAboutSamiti(
    id,
    formData
) {

    return axios.put(
        `${ABOUT_API}/${id}`,
        formData
    );

}

async function deleteAboutSamiti(id) {

    return axios.delete(
        `${ABOUT_API}/${id}`
    );

}