const EVENT_GALLERY_API =
`${APP_CONFIG.API_BASE_URL}/event-gallery`;

const EVENTS_API =
`${APP_CONFIG.API_BASE_URL}/mainevents`;



async function getEventGallery() {

    return axios.get(
        EVENT_GALLERY_API
    );

}



async function getEventGalleryById(id) {

    return axios.get(
        `${EVENT_GALLERY_API}/${id}`
    );

}



async function createEventGallery(formData) {

    return axios.post(
        EVENT_GALLERY_API,
        formData
    );

}



async function updateEventGallery(
    id,
    formData
) {

    return axios.put(
        `${EVENT_GALLERY_API}/${id}`,
        formData
    );

}



async function deleteEventGallery(id) {

    return axios.delete(
        `${EVENT_GALLERY_API}/${id}`
    );

}



async function getEventsDropdown() {

    return axios.get(
        EVENTS_API
    );

}