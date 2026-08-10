const ADMIN_USERS_API =
`${APP_CONFIG.API_BASE_URL}/admin/users`;

async function getAdminUserById(id) {

    return axios.get(
        `${ADMIN_USERS_API}/${id}`
    );

}

async function updateAdminUser(id, data) {

    return axios.put(
        `${ADMIN_USERS_API}/${id}`,
        data
    );

}
