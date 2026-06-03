document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPresidentMessages();

        document
        .getElementById(
            "presidentForm"
        )
        ?.addEventListener(
            "submit",
            savePresidentMessage
        );

    }
);



let editId = null;

async function loadPresidentMessages() {

    try {

        const response =
        await getPresidentMessages();

        const presidents =
        response.data.data;

        let html = "";

        presidents.forEach(
            president => {

            html += `

            <tr>

            <td>

            <img
            src="${president.president_photo}"
            width="70"
            height="70"
            ">

            </td>

            <td>

            ${president.president_name}

            </td>

            <td>

            ${president.designation}

            </td>

            <td>

            <span class="badge bg-success">

            ${president.status}

            </span>

            </td>

            <td>

            <div class="d-flex gap-2">

            <button
            class="btn btn-info btn-sm"
            onclick="viewPresidentMessage(${president.id})">

            <i class="ri-eye-line"></i>

            </button>

            <button
            class="btn btn-warning btn-sm"
            onclick="editPresidentMessage(${president.id})">

            <i class="ri-edit-line"></i>

            </button>

            <button
            class="btn btn-danger btn-sm"
            onclick="deletePresidentMessageRecord(${president.id})">

            <i class="ri-delete-bin-line"></i>

            </button>

            </div>

            </td>

            </tr>

            `;

        });

        document
        .getElementById(
            "presidentTableBody"
        )
        .innerHTML = html;

    }

    catch(error){

        console.log(error);

    }

}


async function savePresidentMessage(e) {

    e.preventDefault();

    const form =
    document.getElementById(
        "presidentForm"
    );

    const formData =
    new FormData(form);

    try {

        if(editId){

            await updatePresidentMessage(
                editId,
                formData
            );

            alert(
                "Updated Successfully"
            );

        }
        else{

            await createPresidentMessage(
                formData
            );

            alert(
                "Created Successfully"
            );

        }

        editId = null;

        form.reset();

        loadPresidentMessages();

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "presidentModal"
            )
        )
        ?.hide();

    }

    catch(error){

        console.log(error);

    }

}

// edit President Message

async function editPresidentMessage(id) {

    try {

        editId = id;

        const response =
        await getPresidentMessageById(id);

        const president =
        response.data.data;

        document.querySelector(
            '[name="president_name"]'
        ).value =
        president.president_name;

        document.querySelector(
            '[name="designation"]'
        ).value =
        president.designation;

        document.querySelector(
            '[name="message_title"]'
        ).value =
        president.message_title;

        document.querySelector(
            '[name="message_description"]'
        ).value =
        president.message_description;

        document.querySelector(
            '[name="button_name"]'
        ).value =
        president.button_name || "";

        document.querySelector(
            '[name="button_link"]'
        ).value =
        president.button_link || "";

        document.querySelector(
            '[name="status"]'
        ).value =
        president.status;

        new bootstrap.Modal(
            document.getElementById(
                "presidentModal"
            )
        ).show();

    }

    catch(error){

        console.log(error);

    }

}

async function viewPresidentMessage(id){

    const response =
    await getPresidentMessageById(id);

    const president =
    response.data.data;

    document
    .getElementById(
        "viewPresidentContent"
    )
    .innerHTML = `

    <img
    src="${president.president_photo}"
    class="img-fluid rounded mb-3">

    <h4>

    ${president.president_name}

    </h4>

    <h6>

    ${president.designation}

    </h6>

    <h5>

    ${president.message_title}

    </h5>

    <p>

    ${president.message_description}

    </p>

    `;

    new bootstrap.Modal(
        document.getElementById(
            "viewPresidentModal"
        )
    ).show();

}

async function deletePresidentMessageRecord(id){

    const confirmDelete =
    confirm(
        "Delete President Message?"
    );

    if(!confirmDelete)
        return;

    try{

        await deletePresidentMessage(id);

        loadPresidentMessages();

    }

    catch(error){

        console.log(error);

    }

}