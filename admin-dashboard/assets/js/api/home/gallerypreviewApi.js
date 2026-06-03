const GALLERY_API =
`${APP_CONFIG.API_BASE_URL}/gallery`;



async function getGallery() {

    return axios.get(
        GALLERY_API
    );

}


async function getGalleryById(id) {

    return axios.get(
        `${GALLERY_API}/${id}`
    );

}



async function createGallery(formData) {

    return axios.post(
        GALLERY_API,
        formData
    );

}



async function updateGallery(
    id,
    formData
) {

    return axios.put(
        `${GALLERY_API}/${id}`,
        formData
    );

}



async function deleteGallery(id) {

    return axios.delete(
        `${GALLERY_API}/${id}`
    );

}