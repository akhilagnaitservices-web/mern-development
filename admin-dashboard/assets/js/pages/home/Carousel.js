
let editId = null;
let bannerTable;

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadBanners();

        bannerTable = new DataTable(
            "#dataTable"
        );

        document
            .getElementById(
                "bannerForm"
            )
            ?.addEventListener(
                "submit",
                saveBanner
            );

    }
);


async function loadBanners() {

    try {

        const response =
        await getBanners();

       const banners =
response?.data?.data || [];

        let html = "";

        if (!banners.length) {

    document.getElementById(
        "bannerTableBody"
    ).innerHTML = `
        <tr>
            <td colspan="5" class="text-center">
                No Banners Found
            </td>
        </tr>
    `;

    return;
}
        banners.forEach(
            banner => {
              html += `

<tr>

<td>${banner.id}</td>

<td>

<img
src="${banner.banner_image}"
width="70"
height="50"
style="object-fit:cover;border-radius:8px">

</td>

<td>

${banner.banner_title}

</td>

<td>

${
banner.status === "active"
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
onclick="viewBanner(${banner.id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editBanner(${banner.id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="deleteBannerRecord(${banner.id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

        });

        document
        .getElementById(
            "bannerTableBody"
        )
        .innerHTML = html;

    }

    catch(error) {

        console.log(error);

    }

}


async function saveBanner(e) {

    e.preventDefault();

    const form =
    document.getElementById(
        "bannerForm"
    );

    const formData =
    new FormData(form);

    try {

        if(editId){

            await updateBanner(
                editId,
                formData
            );

            alert(
                "Banner Updated Successfully"
            );

        }
        else{

            await createBanner(
                formData
            );

            alert(
                "Banner Added Successfully"
            );

        }

       editId = null;

form.reset();

document.querySelector(
    ".modal-title"
).innerText =
    "Add Banner";

const modalElement =
document.getElementById(
    "bannerModal"
);

const modal =
bootstrap.Modal.getInstance(
    modalElement
);

if(modal){
    modal.hide();
}

bannerTable.destroy();

await loadBanners();

bannerTable = new DataTable(
    "#dataTable"
);

await loadBanners();

bannerTable = new DataTable(
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

async function editBanner(id) {

    try {

        editId = id;

        const response =
        await getBannerById(id);

        const banner =
        response.data.data;

        document.querySelector(
            '[name="banner_title"]'
        ).value =
        banner.banner_title;

        document.querySelector(
            '[name="banner_subtitle"]'
        ).value =
        banner.banner_subtitle;

        document.querySelector(
            '[name="button1_name"]'
        ).value =
        banner.button1_name || "";

        document.querySelector(
            '[name="button1_link"]'
        ).value =
        banner.button1_link || "";

        document.querySelector(
            '[name="status"]'
        ).value =
        banner.status;

        const modal =
        new bootstrap.Modal(
            document.getElementById(
                "bannerModal"
            )
        );

        modal.show();

    }

    catch(error){

        console.log(error);

    }

}

async function deleteBannerRecord(id){

    const confirmDelete =
    confirm(
        "Delete Banner?"
    );

    if(!confirmDelete)
        return;

    try{

      await deleteBanner(id);

bannerTable.destroy();

await loadBanners();

bannerTable = new DataTable(
    "#dataTable"
);

    }

    catch(error){

        console.log(error);

    }

}

async function viewBanner(id) {

    try {

        const response =
            await getBannerById(id);

        const banner =
            response.data.data;

        document
            .getElementById(
                "viewBannerContent"
            )
            .innerHTML = `

            <div class="row g-4">

                <div class="col-md-5">

                    <img
                        src="${banner.banner_image}"
                        class="img-fluid rounded shadow-sm w-100"
                        style="height:250px;object-fit:cover;">

                </div>

                <div class="col-md-7">

                    <h4 class="mb-3">
                        ${banner.banner_title || "-"}
                    </h4>

                    <p class="text-muted mb-4">
                        ${banner.banner_subtitle || "-"}
                    </p>

                    <table class="table table-borderless">

                        <tr>
                            <th width="120">
                                Status
                            </th>
                            <td>

                                ${
                                    banner.status === "active"
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

                        <tr>
                            <th>
                                Button 1
                            </th>
                            <td>
                                ${banner.button1_name || "-"}
                            </td>
                        </tr>

                        <tr>
                            <th>
                                Link
                            </th>
                            <td>
                                ${banner.button1_link || "-"}
                            </td>
                        </tr>

                    </table>

                </div>

            </div>

            `;

        new bootstrap.Modal(
            document.getElementById(
                "viewBannerModal"
            )
        ).show();

    }

    catch (error) {

        console.error(error);

    }

}