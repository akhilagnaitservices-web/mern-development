let gothraId = null;
let gothrasTable;



document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadGothras();

        gothrasTable =
        new DataTable(
            "#dataTable"
        );

        document
        .getElementById(
            "gothraForm"
        )
        ?.addEventListener(
            "submit",
            saveGothra
        );

    }
);



// LOAD
async function loadGothras() {

    try {

        const response =
        await getGothras();

        const gothras =
        response.data.data;

        let html = "";

        gothras.forEach(
            (
                gothra,
                index
            ) => {

                html += `
                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>
                            <i class="${gothra.icon} fs-4"></i>
                        </td>

                        <td>
                            ${gothra.gothra_name}
                        </td>

                        <td>
                            ${gothra.alphabetical_letter}
                        </td>

                        <td>
                            ${gothra.display_order}
                        </td>

                        <td>

                            ${
                                gothra.status === "active"

                                ?

                                `<span class="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                    Active
                                </span>`

                                :

                                `<span class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">
                                    Inactive
                                </span>`
                            }

                        </td>

                        <td>

<div class="d-flex align-items-center gap-10">

<a
class="w-32-px h-32-px bg-primary-light text-primary-600 rounded-circle d-flex justify-content-center align-items-center"
onclick="viewGothra(${gothra.id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editGothra(${gothra.id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeGothra(${gothra.id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

                        </td>

                    </tr>
                `;

            }
        );

        document.getElementById(
            "gothrasTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}



// SAVE
async function saveGothra(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "gothraForm"
        );

        const formData =
        Object.fromEntries(
            new FormData(form)
        );

        if (gothraId) {

            await updateGothra(
                gothraId,
                formData
            );

            alert(
                "Gothra updated successfully"
            );

        } else {

            await createGothra(
                formData
            );

            alert(
                "Gothra created successfully"
            );

        }

        form.reset();

        gothraId = null;

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "gothraModal"
            )
        )
        ?.hide();

        loadGothras();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}



// EDIT
async function editGothra(id) {

    const response =
    await getGothraById(id);

    const gothra =
    response.data.data;

    gothraId = id;

    document.getElementById(
        "gothra_name"
    ).value =
    gothra.gothra_name;

    document.getElementById(
        "alphabetical_letter"
    ).value =
    gothra.alphabetical_letter;

    document.getElementById(
        "short_description"
    ).value =
    gothra.short_description || "";

    document.getElementById(
        "icon"
    ).value =
    gothra.icon || "";

    document.getElementById(
        "display_order"
    ).value =
    gothra.display_order;

    document.getElementById(
        "status"
    ).value =
    gothra.status;

    document.querySelector(
        "#gothraModal .modal-title"
    ).textContent =
    "Update Gothra";

    new bootstrap.Modal(
        document.getElementById(
            "gothraModal"
        )
    ).show();

}



// DELETE
async function removeGothra(id) {

    if (
        !confirm(
            "Delete this Gothra?"
        )
    ) return;

    await deleteGothra(id);

    loadGothras();

}



// VIEW
async function viewGothra(id) {

    const response =
    await getGothraById(id);

    const gothra =
    response.data.data;

    document.getElementById(
        "viewGothraContent"
    ).innerHTML = `

<div class="row">

<div class="col-md-3 text-center">

<i
class="${gothra.icon}"
style="font-size:80px;">
</i>

</div>

<div class="col-md-9">

<h4>
${gothra.gothra_name}
</h4>

<p>
${gothra.short_description || "-"}
</p>

<table class="table">

<tr>
<th>Letter</th>
<td>${gothra.alphabetical_letter}</td>
</tr>

<tr>
<th>Display Order</th>
<td>${gothra.display_order}</td>
</tr>

<tr>
<th>Status</th>
<td>${gothra.status}</td>
</tr>

</table>

</div>

</div>

`;

    new bootstrap.Modal(
        document.getElementById(
            "viewGothraModal"
        )
    ).show();

}