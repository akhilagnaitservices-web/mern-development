let photoId = null;
let galleryPhotosTable;

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadAlbumsDropdown();

        await loadGalleryPhotos();

        galleryPhotosTable =
        new DataTable(
            "#dataTable"
        );

        document
        .getElementById(
            "galleryPhotoForm"
        )
        ?.addEventListener(
            "submit",
            saveGalleryPhoto
        );

    }
);

async function loadAlbumsDropdown() {

    try {

        const response =
        await getAlbumsDropdown();

        const albums =
        response.data.data;

        let html =
        `<option value="">
            Select Album
        </option>`;

        albums.forEach(
            album => {

                html += `
                <option
                value="${album.album_id}">
                    ${album.album_title}
                </option>
                `;

            }
        );

        document.getElementById(
            "album_id"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function loadGalleryPhotos() {

    try {

        const response =
        await getGalleryPhotos();

        const photos =
        response.data.data;

        let html = "";

        photos.forEach(
            (
                photo,
                index
            ) => {

                html += `

<tr>

<td>
${index + 1}
</td>

<td>

<img
src="${photo.photo_image}"
width="80"
class="rounded">

</td>

<td>
${photo.album_title}
</td>

<td>
${photo.photo_title || "-"}
</td>

<td>

${
photo.featured_photo === "yes"

?

`<span class="badge bg-warning">
Featured
</span>`

:

`<span class="badge bg-secondary">
No
</span>`
}

</td>

<td>

${
photo.status === "active"

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
onclick="viewGalleryPhoto(${photo.photo_id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editGalleryPhoto(${photo.photo_id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeGalleryPhoto(${photo.photo_id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );

        document.getElementById(
            "galleryPhotosTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function saveGalleryPhoto(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "galleryPhotoForm"
        );

        const formData =
        new FormData(form);

        if (photoId) {

            await updateGalleryPhoto(
                photoId,
                formData
            );

            alert(
                "Photo updated successfully"
            );

        } else {

            await createGalleryPhoto(
                formData
            );

            alert(
                "Photo created successfully"
            );

        }

        form.reset();

        photoId = null;

        document.querySelector(
            "#galleryPhotoModal .modal-title"
        ).textContent =
        "Add Photo";

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "galleryPhotoModal"
            )
        )
        ?.hide();

        loadGalleryPhotos();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}

async function editGalleryPhoto(id) {

    try {

        const response =
        await getGalleryPhotoById(id);

        const photo =
        response.data.data;

        photoId = id;

        document.getElementById(
            "album_id"
        ).value =
        photo.album_id || "";

        document.getElementById(
            "photo_title"
        ).value =
        photo.photo_title || "";

        document.getElementById(
            "photo_description"
        ).value =
        photo.photo_description || "";

        document.getElementById(
            "image_alt_tag"
        ).value =
        photo.image_alt_tag || "";

        document.getElementById(
            "image_order"
        ).value =
        photo.image_order || 0;

        document.getElementById(
            "featured_photo"
        ).value =
        photo.featured_photo || "No";

        document.getElementById(
            "status"
        ).value =
        photo.status || "active";

        document.querySelector(
            "#galleryPhotoModal .modal-title"
        ).textContent =
        "Update Photo";

        new bootstrap.Modal(
            document.getElementById(
                "galleryPhotoModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function viewGalleryPhoto(id) {

    try {

        const response =
        await getGalleryPhotoById(id);

        const photo =
        response.data.data;

        document.getElementById(
            "viewGalleryPhotoContent"
        ).innerHTML = `

<div class="row">

<div class="col-md-4 text-center">

<img
src="${photo.photo_image}"
class="img-fluid rounded shadow">

</div>

<div class="col-md-8">

<table class="table table-bordered">

<tr>
<th width="180">
Album
</th>
<td>
${photo.album_title || "-"}
</td>
</tr>

<tr>
<th>
Photo Title
</th>
<td>
${photo.photo_title || "-"}
</td>
</tr>

<tr>
<th>
Alt Tag
</th>
<td>
${photo.image_alt_tag || "-"}
</td>
</tr>

<tr>
<th>
Image Order
</th>
<td>
${photo.image_order}
</td>
</tr>

<tr>
<th>
Featured
</th>
<td>
${photo.featured_photo}
</td>
</tr>

<tr>
<th>
Status
</th>
<td>
${photo.status}
</td>
</tr>

</table>

<div class="mt-3">

<h6>
Description
</h6>

<p>
${photo.photo_description || "-"}
</p>

</div>

</div>

</div>

`;

        new bootstrap.Modal(
            document.getElementById(
                "viewGalleryPhotoModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function removeGalleryPhoto(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this photo?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteGalleryPhoto(id);

        alert(
            "Photo deleted successfully"
        );

        loadGalleryPhotos();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to delete photo"
        );

    }

}