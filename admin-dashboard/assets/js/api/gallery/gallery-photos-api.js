const GALLERY_PHOTOS_API =
`${APP_CONFIG.API_BASE_URL}/gallery-photos`;

const GALLERY_ALBUMS_API =
`${APP_CONFIG.API_BASE_URL}/gallery-albums`;



async function getGalleryPhotos() {

    return axios.get(
        GALLERY_PHOTOS_API
    );

}



async function getGalleryPhotoById(id) {

    return axios.get(
        `${GALLERY_PHOTOS_API}/${id}`
    );

}



async function createGalleryPhoto(formData) {

    return axios.post(
        GALLERY_PHOTOS_API,
        formData
    );

}



async function updateGalleryPhoto(
    id,
    formData
) {

    return axios.put(
        `${GALLERY_PHOTOS_API}/${id}`,
        formData
    );

}



async function deleteGalleryPhoto(id) {

    return axios.delete(
        `${GALLERY_PHOTOS_API}/${id}`
    );

}



async function getAlbumsDropdown() {

    return axios.get(
        GALLERY_ALBUMS_API
    );

}