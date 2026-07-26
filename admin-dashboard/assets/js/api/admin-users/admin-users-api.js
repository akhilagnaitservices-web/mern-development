const ADMIN_USERS_API =
`${APP_CONFIG.API_BASE_URL}/admin/users`;

async function getAdminUserById(id) {

    return axios.get(
        `${ADMIN_USERS_API}/${id}`
    );

}
