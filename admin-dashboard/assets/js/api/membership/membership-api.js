const MEMBERSHIP_API =
`${APP_CONFIG.API_BASE_URL}/admin/membership`;

async function getMembers() {

    return axios.get(
        MEMBERSHIP_API
    );

}

async function updateMember(id, data) {

    return axios.put(
        `${MEMBERSHIP_API}/${id}`,
        data
    );

}

async function updateMemberStatus(id, status) {

    return axios.put(
        `${MEMBERSHIP_API}/${id}/status`,
        { status }
    );

}

async function deleteMember(id) {

    return axios.delete(
        `${MEMBERSHIP_API}/${id}`
    );

}

async function createMember(formData) {

    // No Content-Type override — the browser must set the multipart
    // boundary itself, or the upload silently fails.
    return axios.post(
        `${APP_CONFIG.API_BASE_URL}/membership/auth/register`,
        formData
    );

}
