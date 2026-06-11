const CONTACT_MESSAGES_API =
`${APP_CONFIG.API_BASE_URL}/contact-messages`;

async function getContactMessages() {

    return axios.get(
        CONTACT_MESSAGES_API
    );

}

async function getContactMessageById(id) {

    return axios.get(
        `${CONTACT_MESSAGES_API}/${id}`
    );

}

async function updateMessageStatus(
    id,
    payload
) {

    return axios.put(
        `${CONTACT_MESSAGES_API}/${id}/status`,
        payload
    );

}

async function deleteContactMessage(id) {

    return axios.delete(
        `${CONTACT_MESSAGES_API}/${id}`
    );

}