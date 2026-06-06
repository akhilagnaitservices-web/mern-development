const GOTHRAS_API =
`${APP_CONFIG.API_BASE_URL}/gothras`;

async function getGothras() {

    return axios.get(
        GOTHRAS_API
    );

}

async function getGothraById(id) {

    return axios.get(
        `${GOTHRAS_API}/${id}`
    );

}

async function createGothra(data) {

    return axios.post(
        GOTHRAS_API,
        data
    );

}

async function updateGothra(
    id,
    data
) {

    return axios.put(
        `${GOTHRAS_API}/${id}`,
        data
    );

}

async function deleteGothra(id) {

    return axios.delete(
        `${GOTHRAS_API}/${id}`
    );

}