const NEWS_API =
`${APP_CONFIG.API_BASE_URL}/news`;

async function getNewsCategories() {

    return axios.get(
        `${APP_CONFIG.API_BASE_URL}/news-categories`
    );

}

async function getNews() {

    return axios.get(
        NEWS_API
    );

}



async function getNewsById(id) {

    return axios.get(
        `${NEWS_API}/${id}`
    );

}



async function createNews(formData) {

    return axios.post(

        NEWS_API,

        formData,

        {

            headers: {

                "Content-Type":
                "multipart/form-data"

            }

        }

    );

}



async function updateNews(
    id,
    formData
) {

    return axios.put(

        `${NEWS_API}/${id}`,

        formData,

        {

            headers: {

                "Content-Type":
                "multipart/form-data"

            }

        }

    );

}



async function deleteNews(id) {

    return axios.delete(
        `${NEWS_API}/${id}`
    );

}



async function getPopularNews() {

    return axios.get(
        `${NEWS_API}/popular`
    );

}