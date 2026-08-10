const ADMIN_AUTH_API =
`${APP_CONFIG.API_BASE_URL}/admin/auth`;

async function adminLogin(data) {

    return axios.post(
        `${ADMIN_AUTH_API}/login`,
        data
    );

}

async function changeAdminPassword(data) {

    return axios.put(
        `${ADMIN_AUTH_API}/change-password`,
        data
    );

}
