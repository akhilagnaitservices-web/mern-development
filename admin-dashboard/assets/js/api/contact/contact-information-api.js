const CONTACT_INFORMATION_API =
`${APP_CONFIG.API_BASE_URL}/contact-information`;



async function getContactInformation() {

    return axios.get(
        CONTACT_INFORMATION_API
    );

}



async function createContactInformation(data) {

    return axios.post(
        CONTACT_INFORMATION_API,
        data
    );

}



async function updateContactInformation(
    id,
    data
) {

    return axios.put(
        `${CONTACT_INFORMATION_API}/${id}`,
        data
    );

}