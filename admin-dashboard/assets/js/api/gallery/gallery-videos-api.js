const GALLERY_VIDEOS_API =
`${APP_CONFIG.API_BASE_URL}/gallery-videos`;

const GALLERY_ALBUMS_API =
`${APP_CONFIG.API_BASE_URL}/gallery-albums`;

async function getAlbumsDropdown() {

    return axios.get(
        GALLERY_ALBUMS_API
    );

}

async function getGalleryVideos() {
    return axios.get(GALLERY_VIDEOS_API);
}

async function getGalleryVideoById(id) {
    return axios.get(`${GALLERY_VIDEOS_API}/${id}`);
}

async function createGalleryVideo(formData) {
    return axios.post(GALLERY_VIDEOS_API, formData);
}

async function updateGalleryVideo(id, formData) {
    return axios.put(
        `${GALLERY_VIDEOS_API}/${id}`,
        formData
    );
}

async function deleteGalleryVideo(id) {
    return axios.delete(
        `${GALLERY_VIDEOS_API}/${id}`
    );
}