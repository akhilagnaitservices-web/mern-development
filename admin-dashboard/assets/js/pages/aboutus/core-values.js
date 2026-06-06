let coreValueId = null;
let coreValuesTable;

document.addEventListener(
"DOMContentLoaded",
async () => {

  
    await loadCoreValues();

    coreValuesTable =
    new DataTable(
        "#dataTable"
    );

    document
    .getElementById(
        "coreValueForm"
    )
    ?.addEventListener(
        "submit",
        saveCoreValue
    );

}
  

);

// LOAD
async function loadCoreValues() {

  
try {

    const response =
    await getCoreValues();

    const values =
    response.data.data;

    let html = "";

    values.forEach(
        (
            value,
            index
        ) => {

            html += `
                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        <i class="${value.icon} fs-4"></i>
                    </td>

                    <td>
                        ${value.title}
                    </td>

                    <td>
                        ${value.display_order}
                    </td>

                    <td>

                        ${
                            value.status === "active"

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
onclick="viewCoreValue(${value.id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editCoreValue(${value.id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeCoreValue(${value.id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

  
                    </td>

                </tr>
            `;

        }
    );

    document.getElementById(
        "coreValuesTableBody"
    ).innerHTML = html;

} catch (error) {

    console.error(error);

}
  

}

// SAVE
async function saveCoreValue(e) {

  
e.preventDefault();

try {

    const form =
    document.getElementById(
        "coreValueForm"
    );

    const formData =
    Object.fromEntries(
        new FormData(form)
    );

    if (coreValueId) {

        await updateCoreValue(
            coreValueId,
            formData
        );

        alert(
            "Core Value updated successfully"
        );

    } else {

        await createCoreValue(
            formData
        );

        alert(
            "Core Value created successfully"
        );

    }

    form.reset();

    coreValueId = null;

    bootstrap.Modal
    .getInstance(
        document.getElementById(
            "coreValueModal"
        )
    )
    ?.hide();

    loadCoreValues();

} catch (error) {

    console.error(error);

}
  

}

// EDIT
async function editCoreValue(id) {

  
const response =
await getCoreValueById(id);

const value =
response.data.data;

coreValueId = id;

document.getElementById(
    "title"
).value =
value.title;

document.getElementById(
    "description"
).value =
value.description;

document.getElementById(
    "icon"
).value =
value.icon;

document.getElementById(
    "display_order"
).value =
value.display_order;

document.getElementById(
    "status"
).value =
value.status;

new bootstrap.Modal(
    document.getElementById(
        "coreValueModal"
    )
).show();
  

}

// DELETE
async function removeCoreValue(id) {

  
if (
    !confirm(
        "Delete this Core Value?"
    )
) return;

await deleteCoreValue(id);

loadCoreValues();
  

}

// VIEW
async function viewCoreValue(id) {

  
const response =
await getCoreValueById(id);

const value =
response.data.data;

document.getElementById(
    "viewCoreValueContent"
).innerHTML = `
  

<div class="row">

<div class="col-md-3 text-center">

<i
class="${value.icon}"
style="font-size:80px;"> </i>

</div>

<div class="col-md-9">

<h4>
${value.title}
</h4>

<p>
${value.description}
</p>

<table class="table">

<tr>
<th>Display Order</th>
<td>${value.display_order}</td>
</tr>

<tr>
<th>Status</th>
<td>${value.status}</td>
</tr>

</table>

</div>

</div>

`;

  
new bootstrap.Modal(
    document.getElementById(
        "viewCoreValueModal"
    )
).show();
  

}
