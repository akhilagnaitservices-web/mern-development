const EVENT_REGISTRATIONS_API =
`${APP_CONFIG.API_BASE_URL}/event-registrations`;



async function getEventRegistrations() {

    return axios.get(
        EVENT_REGISTRATIONS_API
    );

}



async function getEventRegistrationById(id) {

    return axios.get(
        `${EVENT_REGISTRATIONS_API}/${id}`
    );

}



async function deleteEventRegistration(id) {

    return axios.delete(
        `${EVENT_REGISTRATIONS_API}/${id}`
    );

}