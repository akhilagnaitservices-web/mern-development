let galleryId = null;

let eventGalleryTable;

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadEventsDropdown();

        await loadEventGallery();

        eventGalleryTable =
        new DataTable(
            "#dataTable"
        );

        document
        .getElementById(
            "eventGalleryForm"
        )
        ?.addEventListener(
            "submit",
            saveEventGallery
        );

    }
);



async function loadEventsDropdown() {

    try {

        const response =
        await getEventsDropdown();

        const events =
        response.data.data;

        let html =
        `<option value="">
            Select Event
        </option>`;

        events.forEach(
            event => {

                html += `
                    <option
                    value="${event.event_id}">
                        ${event.event_title}
                    </option>
                `;

            }
        );

        document.getElementById(
            "event_id"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function loadEventGallery() {

    try {

        const response =
        await getEventGallery();

        const galleries =
        response.data.data;

        let html = "";

        galleries.forEach(
            (
                gallery,
                index
            ) => {

                html += `

<tr>

<td>
${index + 1}
</td>

<td>

${
gallery.image_path
?
`
<img
src="${gallery.image_path}"
width="80"
class="rounded">
`
:
"-"
}

</td>

<td>
${gallery.event_title || "-"}
</td>

<td>
${gallery.image_title || "-"}
</td>

<td>
${gallery.sort_order}
</td>

<td>

${
gallery.status === "active"

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
onclick="viewEventGallery(${gallery.gallery_id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editEventGallery(${gallery.gallery_id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeEventGallery(${gallery.gallery_id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );

        document.getElementById(
            "eventGalleryTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function saveEventGallery(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "eventGalleryForm"
        );

        const formData =
        new FormData(form);

        if (galleryId) {

            await updateEventGallery(
                galleryId,
                formData
            );

            alert(
                "Gallery image updated successfully"
            );

        } else {

            await createEventGallery(
                formData
            );

            alert(
                "Gallery image created successfully"
            );

        }

        form.reset();

        galleryId = null;

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "eventGalleryModal"
            )
        )
        ?.hide();

        document.activeElement?.blur();

        loadEventGallery();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}

async function editEventGallery(id) {

    try {

        const response =
        await getEventGalleryById(id);

        const gallery =
        response.data.data;

        galleryId = id;

        document.getElementById(
            "event_id"
        ).value =
        gallery.event_id;

        document.getElementById(
            "image_title"
        ).value =
        gallery.image_title || "";

        document.getElementById(
            "sort_order"
        ).value =
        gallery.sort_order || 0;

        document.getElementById(
            "status"
        ).value =
        gallery.status || "active";

        document.querySelector(
            "#eventGalleryModal .modal-title"
        ).textContent =
        "Update Gallery Image";

        new bootstrap.Modal(
            document.getElementById(
                "eventGalleryModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function removeEventGallery(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this gallery image?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteEventGallery(id);

        alert(
            "Gallery image deleted successfully"
        );

        loadEventGallery();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to delete gallery image"
        );

    }

}

async function viewEventGallery(id) {

    try {

        const response =
        await getEventGalleryById(id);

        const gallery =
        response.data.data;

        document.getElementById(
            "viewEventGalleryContent"
        ).innerHTML = `

<div class="row">

<div class="col-md-5 text-center">

<img
src="${gallery.image_path}"
class="img-fluid rounded shadow">

</div>

<div class="col-md-7">

<table class="table table-bordered">

<tr>
<th>Image Title</th>
<td>${gallery.image_title || "-"}</td>
</tr>

<tr>
<th>Event ID</th>
<td>${gallery.event_id}</td>
</tr>

<tr>
<th>Sort Order</th>
<td>${gallery.sort_order}</td>
</tr>

<tr>
<th>Status</th>
<td>${gallery.status}</td>
</tr>

<tr>
<th>Created At</th>
<td>${gallery.created_at}</td>
</tr>

</table>

</div>

</div>

`;

        new bootstrap.Modal(
            document.getElementById(
                "viewEventGalleryModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}