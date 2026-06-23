const HEADER_API =
`${APP_CONFIG.API_BASE_URL}/header`;

/* ==========================
HEADER
========================== */

async function getHeader() {

    return axios.get(
        HEADER_API
    );

}

async function createHeader(formData) {

    return axios.post(

        HEADER_API,

        formData,

        {
            headers: {
                "Content-Type":
                "multipart/form-data"
            }
        }

    );

}

async function updateHeader(
    id,
    formData
) {

    return axios.put(

        `${HEADER_API}/${id}`,

        formData,

        {
            headers: {
                "Content-Type":
                "multipart/form-data"
            }
        }

    );

}

async function deleteHeader(id) {

    return axios.delete(
        `${HEADER_API}/${id}`
    );

}

/* ==========================
SOCIAL MEDIA
========================== */

async function getSocialMediaLinks() {

    return axios.get(
        `${HEADER_API}/social-media`
    );

}

async function createSocialMediaLink(data) {

    return axios.post(
        `${HEADER_API}/social-media`,
        data
    );

}

async function updateSocialMediaLink(
    id,
    data
) {

    return axios.put(
        `${HEADER_API}/social-media/${id}`,
        data
    );

}

async function deleteSocialMediaLink(id) {

    return axios.delete(
        `${HEADER_API}/social-media/${id}`
    );

}

/* ==========================
FOOTER QUICK LINKS
========================== */

async function getFooterQuickLinks() {

    return axios.get(
        `${HEADER_API}/footer-links`
    );

}

async function createFooterQuickLink(data) {

    return axios.post(
        `${HEADER_API}/footer-links`,
        data
    );

}

async function updateFooterQuickLink(
    id,
    data
) {

    return axios.put(
        `${HEADER_API}/footer-links/${id}`,
        data
    );

}

async function deleteFooterQuickLink(id) {

    return axios.delete(
        `${HEADER_API}/footer-links/${id}`
    );

}