
let editId = null;
let FlashNewsTable;

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadFlashNewss();

        FlashNewsTable = new DataTable(
            "#dataTable"
        );

        document
            .getElementById(
                "FlashNewsForm"
            )
            ?.addEventListener(
                "submit",
                saveFlashNews
            );

    }
);



// this is for gell all flash news and show in table
//  and also for add new flash news and update flash 
// news and delete flash news and view flash news details in modal
async function loadFlashNewss() {

    try {

        const response =
        await getFlashNews();

       const FlashNewss =
response?.data?.data || [];

        let html = "";

        if (!FlashNewss.length) {

    document.getElementById(
        "FlashNewsTableBody"
    ).innerHTML = `
        <tr>
            <td colspan="7" class="text-center">
                No FlashNewss Found
            </td>
        </tr>
    `;

    return;
}
        FlashNewss.forEach(
            FlashNews => {
              html += `

<tr>

<td>${FlashNews.id}</td>

<td>

<img
src="${FlashNews.news_image}"
width="70"
height="50"
style="object-fit:cover;border-radius:8px">

</td>

<td>${FlashNews.news_title}</td>

<td>${FlashNews.news_slug}</td>

<td>
${new Date(
    FlashNews.news_date
).toLocaleDateString()}
</td>

<td>

${
FlashNews.status === "active"
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
onclick="viewFlashNews(${FlashNews.id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
href="javascript:void(0)"
onclick="editFlashNews(${FlashNews.id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
href="javascript:void(0)"
onclick="deleteFlashNewsRecord(${FlashNews.id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

        });

        document
        .getElementById(
            "FlashNewsTableBody"
        )
        .innerHTML = html;

    }

    catch(error) {

        console.log(error);

    }

}

// ================================
// Create / Update Flash News
// ================================

async function saveFlashNews(e) {

    e.preventDefault();

    const form =
    document.getElementById(
        "FlashNewsForm"
    );

    const formData =
    new FormData(form);

    try {

        if(editId){

            await updateFlashNews(
                editId,
                formData
            );

            alert(
                "FlashNews Updated Successfully"
            );

        }
        else{

            await createFlashNews(
                formData
            );

            alert(
                "FlashNews Added Successfully"
            );

        }

       editId = null;

form.reset();

document.querySelector(
    ".modal-title"
).innerText =
    "Add FlashNews";

const modalElement =
document.getElementById(
    "FlashNewsModal"
);

const modal =
bootstrap.Modal.getInstance(
    modalElement
);

if(modal){
    modal.hide();
}

FlashNewsTable.destroy();

await loadFlashNewss();

FlashNewsTable = new DataTable(
    "#dataTable"
);

    }

    catch(error) {

        console.log(error);

        alert(
            "Something Went Wrong"
        );

    }

}

async function editFlashNews(id) {

    try {

        editId = id;

        const response =
        await getFlashNewsById(id);

        const FlashNews =
        response.data.data;

        document.querySelector(
            '[name="news_title"]'
        ).value =
        FlashNews.news_title;

        document.querySelector(
            '[name="news_slug"]'
        ).value =
        FlashNews.news_slug;

        document.querySelector(
            '[name="short_description"]'
        ).value =
        FlashNews.short_description || "";

        document.querySelector(
            '[name="full_description"]'
        ).value =
        FlashNews.full_description || "";

       document.querySelector(
          '[name="news_date"]'
          ).value =
          FlashNews.news_date
          ?
          FlashNews.news_date.split("T")[0]
          :
          "";



        document.querySelector(
            '[name="status"]'
        ).value =
        FlashNews.status;

        document.querySelector(
            ".modal-title"
        ).innerText =
            "Edit Flash News";
            
        const modal =
        new bootstrap.Modal(
            document.getElementById(
                "FlashNewsModal"
            )
        );

        modal.show();

    }

    catch(error){

        console.log(error);

    }

}

async function deleteFlashNewsRecord(id){

    const confirmDelete =
    confirm(
        "Delete FlashNews?"
    );

    if(!confirmDelete)
        return;

    try{

      await deleteFlashNews(id);

FlashNewsTable.destroy();

await loadFlashNewss();

FlashNewsTable = new DataTable(
    "#dataTable"
);

    }

    catch(error){

        console.log(error);

    }

}

async function viewFlashNews(id) {

    try {

        const response =
            await getFlashNewsById(id);

        const FlashNews =
            response.data.data;

        document
            .getElementById(
                "viewFlashNewsContent"
            )
            .innerHTML = `

            <div class="row g-4">

                <div class="col-md-5">

                    <img
                        src="${FlashNews.news_image}"
                        class="img-fluid rounded shadow-sm w-100"
                        style="height:250px;object-fit:cover;">

                </div>

                <div class="col-md-7">

                  <h4 class="mb-3">
${FlashNews.news_title}
</h4>

<table class="table table-borderless">

<tr>
<th>Slug</th>
<td>${FlashNews.news_slug}</td>
</tr>

<tr>
<th>Short Description</th>
<td>${FlashNews.short_description}</td>
</tr>

<tr>
<th>Full Description</th>
<td>${FlashNews.full_description}</td>
</tr>

<tr>
<th>Date</th>
<td>
${new Date(
    FlashNews.news_date
).toLocaleDateString()}
</td>
</tr>

<tr>
<th>Status</th>

<td>

${
FlashNews.status === "active"
?
`<span class="badge bg-success">
Active
</span>`
:
`<span class="badge bg-danger">
Inactive
</span>`
}

</td>

</tr>

</table>

       

                    </table>

                </div>

            </div>

            `;

        new bootstrap.Modal(
            document.getElementById(
                "viewFlashNewsModal"
            )
        ).show();

    }

    catch (error) {

        console.error(error);

    }

}