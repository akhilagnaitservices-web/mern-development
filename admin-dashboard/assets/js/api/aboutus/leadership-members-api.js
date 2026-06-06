const LEADERSHIP_MEMBER_API =
`${APP_CONFIG.API_BASE_URL}/leadership-members`;

async function getLeadershipMembers() {

return axios.get(
    LEADERSHIP_MEMBER_API
);
}

async function getLeadershipMemberById(id) {
return axios.get(
    `${LEADERSHIP_MEMBER_API}/${id}`
);
}

async function createLeadershipMember(formData) {
return axios.post(
    LEADERSHIP_MEMBER_API,
    formData
);
}

async function updateLeadershipMember(
id,
formData
) {


return axios.put(
    `${LEADERSHIP_MEMBER_API}/${id}`,
    formData
);
}

async function deleteLeadershipMember(id) {
return axios.delete(
    `${LEADERSHIP_MEMBER_API}/${id}`
);
}
