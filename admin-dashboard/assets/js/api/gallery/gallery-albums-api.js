const GALLERY_ALBUMS_API =
`${APP_CONFIG.API_BASE_URL}/gallery-albums`;

const GALLERY_CATEGORIES_API =
`${APP_CONFIG.API_BASE_URL}/gallery-categories`;



async function getGalleryAlbums() {

    return axios.get(
        GALLERY_ALBUMS_API
    );

}



async function getGalleryAlbumById(id) {

    return axios.get(
        `${GALLERY_ALBUMS_API}/${id}`
    );

}



async function createGalleryAlbum(formData) {

    return axios.post(
        GALLERY_ALBUMS_API,
        formData
    );

}



async function updateGalleryAlbum(
    id,
    formData
) {

    return axios.put(
        `${GALLERY_ALBUMS_API}/${id}`,
        formData
    );

}



async function deleteGalleryAlbum(id) {

    return axios.delete(
        `${GALLERY_ALBUMS_API}/${id}`
    );

}



async function getGalleryCategoriesDropdown() {

    return axios.get(
        GALLERY_CATEGORIES_API
    );

}