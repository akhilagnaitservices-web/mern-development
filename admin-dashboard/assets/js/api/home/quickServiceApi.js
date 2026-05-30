const QUICK_SERVICE_API =
`${APP_CONFIG.API_BASE_URL}/quick-services`;

async function getQuickServices() {

    return axios.get(
        QUICK_SERVICE_API
    );

}

async function getQuickServiceById(id) {

    return axios.get(
        `${QUICK_SERVICE_API}/${id}`
    );

}

async function createQuickService(formData) {

    return axios.post(
        QUICK_SERVICE_API,
        formData
    );

}

async function updateQuickService(
    id,
    formData
) {

    return axios.put(
        `${QUICK_SERVICE_API}/${id}`,
        formData
    );

}

async function deleteQuickService(id) {

    return axios.delete(
        `${QUICK_SERVICE_API}/${id}`
    );

}