const GALLERY_CATEGORIES_API =
`${APP_CONFIG.API_BASE_URL}/gallery-categories`;



async function getGalleryCategories() {

    return axios.get(
        GALLERY_CATEGORIES_API
    );

}



async function getGalleryCategoryById(id) {

    return axios.get(
        `${GALLERY_CATEGORIES_API}/${id}`
    );

}



async function createGalleryCategory(data) {

    return axios.post(
        GALLERY_CATEGORIES_API,
        data
    );

}

async function updateGalleryCategory(
    id,
    data
) {

    return axios.put(
        `${GALLERY_CATEGORIES_API}/${id}`,
        data
    );

}



async function deleteGalleryCategory(id) {

    return axios.delete(
        `${GALLERY_CATEGORIES_API}/${id}`
    );

}