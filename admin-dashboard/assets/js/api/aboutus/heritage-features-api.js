const HERITAGE_FEATURES_API =
`${APP_CONFIG.API_BASE_URL}/heritage-features`;

async function getHeritageFeatures() {

 
return axios.get(
    HERITAGE_FEATURES_API
);
 

}

async function getHeritageFeatureById(id) {

 
return axios.get(
    `${HERITAGE_FEATURES_API}/${id}`
);
 

}

async function createHeritageFeature(data) {

 
return axios.post(
    HERITAGE_FEATURES_API,
    data
);
 

}

async function updateHeritageFeature(
id,
data
) {

 
return axios.put(
    `${HERITAGE_FEATURES_API}/${id}`,
    data
);
 

}

async function deleteHeritageFeature(id) {

 
return axios.delete(
    `${HERITAGE_FEATURES_API}/${id}`
);
 

}
