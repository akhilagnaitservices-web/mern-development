document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadQuickServices();

        document
        .getElementById(
            "quickServiceForm"
        )
        ?.addEventListener(
            "submit",
            saveQuickService
        );

    }
);

let editId = null;


async function loadQuickServices() {

    try {

        const response =
        await getQuickServices();

        const services =
        response.data.data;

        let html = "";

        services.forEach(
            service => {

            html += `

            <tr>

            <td>

            <img
            src="${service.service_icon}"
            width="60"
            height="60"
            style="object-fit:cover">

            </td>

            <td>

            ${service.service_name}

            </td>

            <td>

            ${service.display_order}

            </td>

            <td>

            <span class="badge bg-success">

            ${service.status}

            </span>

            </td>

            <td>

            <div class="d-flex gap-2">

            <button
            class="btn btn-info btn-sm"
            onclick="viewQuickService(${service.id})">

            <i class="ri-eye-line"></i>

            </button>

            <button
            class="btn btn-warning btn-sm"
            onclick="editQuickService(${service.id})">

            <i class="ri-edit-line"></i>

            </button>

            <button
            class="btn btn-danger btn-sm"
            onclick="deleteQuickServiceRecord(${service.id})">

            <i class="ri-delete-bin-line"></i>

            </button>

            </div>

            </td>

            </tr>

            `;

        });

        document
        .getElementById(
            "quickServiceTableBody"
        )
        .innerHTML = html;

    }

    catch(error){

        console.log(error);

    }

}


async function saveQuickService(e) {

    e.preventDefault();

    const form =
    document.getElementById(
        "quickServiceForm"
    );

    const formData =
    new FormData(form);

    try {

        if(editId){

            await updateQuickService(
                editId,
                formData
            );

            alert(
                "Service Updated Successfully"
            );

        }
        else{

            await createQuickService(
                formData
            );

            alert(
                "Service Created Successfully"
            );

        }

        editId = null;

        form.reset();

        loadQuickServices();

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "quickServiceModal"
            )
        )
        ?.hide();

    }

    catch(error){

        console.log(error);

    }

}

async function editQuickService(id) {

    try {

        editId = id;

        const response =
        await getQuickServiceById(id);

        const service =
        response.data.data;

        document.querySelector(
            '[name="service_name"]'
        ).value =
        service.service_name;

        document.querySelector(
            '[name="short_description"]'
        ).value =
        service.short_description;

        document.querySelector(
            '[name="redirect_url"]'
        ).value =
        service.redirect_url;

        document.querySelector(
            '[name="display_order"]'
        ).value =
        service.display_order;

        document.querySelector(
            '[name="status"]'
        ).value =
        service.status;

        new bootstrap.Modal(
            document.getElementById(
                "quickServiceModal"
            )
        ).show();

    }

    catch(error){

        console.log(error);

    }

}


async function viewQuickService(id){

    const response =
    await getQuickServiceById(id);

    const service =
    response.data.data;

    document
    .getElementById(
        "viewQuickServiceContent"
    )
    .innerHTML = `

    <img
    src="${service.service_icon}"
    class="img-fluid rounded mb-3"
    >

    <h4>

    ${service.service_name}

    </h4>

    <p>

    ${service.short_description}

    </p>

    <p>

    <strong>URL:</strong>

    ${service.redirect_url}

    </p>

    <p>

    <strong>Display Order:</strong>

    ${service.display_order}

    </p>

    `;

    new bootstrap.Modal(
        document.getElementById(
            "viewQuickServiceModal"
        )
    ).show();

}


async function deleteQuickServiceRecord(id){

    const confirmDelete =
    confirm(
        "Delete Quick Service?"
    );

    if(!confirmDelete)
        return;

    try{

        await deleteQuickService(id);

        loadQuickServices();

    }

    catch(error){

        console.log(error);

    }

}