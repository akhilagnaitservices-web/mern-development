const EVENTS_API =
`${APP_CONFIG.API_BASE_URL}/mainevents`;



async function getEvents() {

    return axios.get(
        EVENTS_API
    );

}



async function getEventById(id) {

    return axios.get(
        `${EVENTS_API}/${id}`
    );

}



async function createEvent(formData) {

    return axios.post(
        EVENTS_API,
        formData
    );

}



async function updateEvent(
    id,
    formData
) {

    return axios.put(
        `${EVENTS_API}/${id}`,
        formData
    );

}


async function deleteEvent(id) {

    return axios.delete(
        `${EVENTS_API}/${id}`
    );

}