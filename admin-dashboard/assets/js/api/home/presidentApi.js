const PRESIDENT_API =
`${APP_CONFIG.API_BASE_URL}/president-message`;

async function getPresidentMessages() {

    return axios.get(
        PRESIDENT_API
    );

}

async function getPresidentMessageById(id) {

    return axios.get(
        `${PRESIDENT_API}/${id}`
    );

}

async function createPresidentMessage(formData) {

    return axios.post(
        PRESIDENT_API,
        formData
    );

}

async function updatePresidentMessage(
    id,
    formData
) {

    return axios.put(
        `${PRESIDENT_API}/${id}`,
        formData
    );

}

async function deletePresidentMessage(id) {

    return axios.delete(
        `${PRESIDENT_API}/${id}`
    );

}