let heritageFeatureId = null;
let heritageFeaturesTable;

document.addEventListener(
"DOMContentLoaded",
async () => {

  
    await loadHeritageFeatures();

    heritageFeaturesTable =
    new DataTable(
        "#dataTable"
    );

    document
    .getElementById(
        "heritageFeatureForm"
    )
    ?.addEventListener(
        "submit",
        saveHeritageFeature
    );

}
  

);

// LOAD
async function loadHeritageFeatures() {

  
try {

    const response =
    await getHeritageFeatures();

    const features =
    response.data.data;

    let html = "";

    features.forEach(
        (
            feature,
            index
        ) => {

            html += `
                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        <i class="${feature.icon} fs-4"></i>
                    </td>

                    <td>
                        ${feature.title}
                    </td>

                    <td>
                        ${feature.display_order}
                    </td>

                    <td>

                        ${
                            feature.status === "active"

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
onclick="viewHeritageFeature(${feature.id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editHeritageFeature(${feature.id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeHeritageFeature(${feature.id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

  
                    </td>

                </tr>
            `;

        }
    );

    document.getElementById(
        "heritageFeaturesTableBody"
    ).innerHTML = html;

} catch (error) {

    console.error(error);

}
  

}

// SAVE
async function saveHeritageFeature(e) {

  
e.preventDefault();

try {

    const form =
    document.getElementById(
        "heritageFeatureForm"
    );

    const formData =
    Object.fromEntries(
        new FormData(form)
    );

    if (heritageFeatureId) {

        await updateHeritageFeature(
            heritageFeatureId,
            formData
        );

        alert(
            "Feature updated successfully"
        );

    } else {

        await createHeritageFeature(
            formData
        );

        alert(
            "Feature created successfully"
        );

    }

    form.reset();

    heritageFeatureId = null;

    bootstrap.Modal
    .getInstance(
        document.getElementById(
            "heritageFeatureModal"
        )
    )
    ?.hide();

    loadHeritageFeatures();

} catch (error) {

    console.error(error);

}
  

}

// EDIT
async function editHeritageFeature(id) {

  
const response =
await getHeritageFeatureById(id);

const feature =
response.data.data;

heritageFeatureId = id;

document.getElementById(
    "title"
).value =
feature.title;

document.getElementById(
    "description"
).value =
feature.description;

document.getElementById(
    "icon"
).value =
feature.icon;

document.getElementById(
    "display_order"
).value =
feature.display_order;

document.getElementById(
    "status"
).value =
feature.status;

new bootstrap.Modal(
    document.getElementById(
        "heritageFeatureModal"
    )
).show();
  

}

// DELETE
async function removeHeritageFeature(id) {

  
if (
    !confirm(
        "Delete this Heritage Feature?"
    )
) return;

await deleteHeritageFeature(id);

loadHeritageFeatures();
  

}

// VIEW
async function viewHeritageFeature(id) {

  
const response =
await getHeritageFeatureById(id);

const feature =
response.data.data;

document.getElementById(
    "viewHeritageFeatureContent"
).innerHTML = `
  

<div class="row">

<div class="col-md-3 text-center">

<i
class="${feature.icon}"
style="font-size:80px;"> </i>

</div>

<div class="col-md-9">

<h4>
${feature.title}
</h4>

<p>
${feature.description}
</p>

<table class="table">

<tr>
<th>Display Order</th>
<td>${feature.display_order}</td>
</tr>

<tr>
<th>Status</th>
<td>${feature.status}</td>
</tr>

</table>

</div>

</div>

`;

  
new bootstrap.Modal(
    document.getElementById(
        "viewHeritageFeatureModal"
    )
).show();
  

}
