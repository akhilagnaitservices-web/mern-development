const CORE_VALUES_API =
`${APP_CONFIG.API_BASE_URL}/core-values`;

async function getCoreValues() {

 
return axios.get(
    CORE_VALUES_API
);
 

}

async function getCoreValueById(id) {

 
return axios.get(
    `${CORE_VALUES_API}/${id}`
);
 

}

async function createCoreValue(data) {

 
return axios.post(
    CORE_VALUES_API,
    data
);
 

}

async function updateCoreValue(
id,
data
) {

 
return axios.put(
    `${CORE_VALUES_API}/${id}`,
    data
);
 

}

async function deleteCoreValue(id) {

 
return axios.delete(
    `${CORE_VALUES_API}/${id}`
);


}
