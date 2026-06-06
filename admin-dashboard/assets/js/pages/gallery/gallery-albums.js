let albumId = null;

let albumsTable;

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadCategoriesDropdown();

        await loadGalleryAlbums();

        albumsTable =
        new DataTable(
            "#dataTable"
        );

        document
        .getElementById(
            "galleryAlbumForm"
        )
        ?.addEventListener(
            "submit",
            saveGalleryAlbum
        );

    }
);

async function loadCategoriesDropdown() {

    try {

        const response =
        await getGalleryCategoriesDropdown();

        const categories =
        response.data.data;

        let html =
        `<option value="">
            Select Category
        </option>`;

        categories.forEach(
            category => {

                html += `
                <option
                value="${category.category_id}">
                    ${category.category_name}
                </option>
                `;

            }
        );

        document.getElementById(
            "category_id"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function loadGalleryAlbums() {

    try {

        const response =
        await getGalleryAlbums();

        const albums =
        response.data.data;

        let html = "";

        albums.forEach(
            (
                album,
                index
            ) => {

                html += `

<tr>

<td>
${index + 1}
</td>

<td>

${
album.album_cover_image
?
`
<img
src="${album.album_cover_image}"
width="80"
class="rounded">
`
:
"-"
}

</td>

<td>
${album.album_title}
</td>

<td>
${album.category_name}
</td>

<td>
${album.event_date || "-"}
</td>

<td>

${
album.status === "active"

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
onclick="viewGalleryAlbum(${album.album_id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editGalleryAlbum(${album.album_id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeGalleryAlbum(${album.album_id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );

        document.getElementById(
            "galleryAlbumsTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function saveGalleryAlbum(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "galleryAlbumForm"
        );

        const formData =
        new FormData(form);

        if (albumId) {

            await updateGalleryAlbum(
                albumId,
                formData
            );

            alert(
                "Album updated successfully"
            );

        } else {

            await createGalleryAlbum(
                formData
            );

            alert(
                "Album created successfully"
            );

        }

        form.reset();

        albumId = null;

        document.querySelector(
            "#galleryAlbumModal .modal-title"
        ).textContent =
        "Add Album";

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "galleryAlbumModal"
            )
        )
        ?.hide();

        loadGalleryAlbums();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}

async function editGalleryAlbum(id) {

    try {

        const response =
        await getGalleryAlbumById(id);

        const album =
        response.data.data;

        albumId = id;

        document.getElementById(
            "category_id"
        ).value =
        album.category_id || "";

        document.getElementById(
            "album_title"
        ).value =
        album.album_title || "";

        document.getElementById(
            "album_description"
        ).value =
        album.album_description || "";

        document.getElementById(
            "event_date"
        ).value =
        album.event_date || "";

        document.getElementById(
            "location"
        ).value =
        album.location || "";

        document.getElementById(
            "display_order"
        ).value =
        album.display_order || 0;

        document.getElementById(
            "status"
        ).value =
        album.status || "active";

        document.querySelector(
            "#galleryAlbumModal .modal-title"
        ).textContent =
        "Update Album";

        new bootstrap.Modal(
            document.getElementById(
                "galleryAlbumModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function viewGalleryAlbum(id) {

    try {

        const response =
        await getGalleryAlbumById(id);

        const album =
        response.data.data;

        document.getElementById(
            "viewGalleryAlbumContent"
        ).innerHTML = `

<div class="row">

<div class="col-md-4 text-center">

${
album.album_cover_image
?
`
<img
src="${album.album_cover_image}"
class="img-fluid rounded shadow">
`
:
`<div class="text-muted">
No Image
</div>`
}

</div>

<div class="col-md-8">

<table class="table table-bordered">

<tr>
<th width="180">
Album Title
</th>
<td>
${album.album_title}
</td>
</tr>

<tr>
<th>
Category
</th>
<td>
${album.category_name || "-"}
</td>
</tr>

<tr>
<th>
Event Date
</th>
<td>
${album.event_date || "-"}
</td>
</tr>

<tr>
<th>
Location
</th>
<td>
${album.location || "-"}
</td>
</tr>

<tr>
<th>
Display Order
</th>
<td>
${album.display_order}
</td>
</tr>

<tr>
<th>
Status
</th>
<td>
${album.status}
</td>
</tr>

</table>

<div class="mt-3">

<h6>
Description
</h6>

<p>
${album.album_description || "-"}
</p>

</div>

</div>

</div>

`;

        new bootstrap.Modal(
            document.getElementById(
                "viewGalleryAlbumModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function removeGalleryAlbum(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this album?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteGalleryAlbum(id);

        alert(
            "Album deleted successfully"
        );

        loadGalleryAlbums();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to delete album"
        );

    }

}