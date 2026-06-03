let editId = null;
let galleryTable;


document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadGallery();

        galleryTable =
        new DataTable(
            "#dataTable"
        );

        document
        .getElementById(
            "galleryForm"
        )
        ?.addEventListener(
            "submit",
            saveGallery
        );

    }
);


// LOAD GALLERY
async function loadGallery() {

    try {

        const response =
        await getGallery();

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
                                gallery.gallery_image
                                ? `
                                    <img
                                        src="${gallery.gallery_image}"
                                        width="80"
                                        class="rounded"
                                    >
                                `
                                : "-"
                            }

                        </td>

                        <td>
                            ${gallery.gallery_title}
                        </td>

                        <td>
                            ${gallery.category || "-"}
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
                                   </span>`}

  
                        </td>

                        <td>

<div class="d-flex align-items-center gap-10">

             <a
             class="w-32-px h-32-px bg-primary-light text-primary-600 rounded-circle d-flex justify-content-center align-items-center"
             onclick="viewGallery(${gallery.id})">
             
             <i class="ri-eye-line"></i>
             
             </a>
            
            <a
            class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
            onclick="editGallery(${gallery.id})">
            
            <i class="ri-edit-line"></i>
            
            </a>
            
            <a
            class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
            onclick="removeGallery(${gallery.id})"">
            
            <i class="ri-delete-bin-line"></i>
            
            </a>
            
</div>

</td>





                    </tr>
                `;

            }
        );

        document.getElementById(
            "galleryTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(
            error
        );

    }

}




// CREATE / UPDATE
async function saveGallery(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "galleryForm"
        );

        const formData =
        new FormData(form);

        if (galleryId) {

            await updateGallery(
                galleryId,
                formData
            );

            alert(
                "Gallery updated successfully"
            );

        } else {

            await createGallery(
                formData
            );

            alert(
                "Gallery created successfully"
            );

        }

        form.reset();

        galleryId = null;

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "galleryModal"
            )
        )
        ?.hide();

        loadGallery();

    } catch (error) {

        console.error(
            error
        );

        alert(
            "Something went wrong"
        );

    }

}




// EDIT
async function editGallery(id) {

    try {

        const response =
        await getGalleryById(id);

        const gallery =
        response.data.data;

        galleryId = id;

        document.getElementById(
            "gallery_title"
        ).value =
        gallery.gallery_title || "";



        document.getElementById(
            "gallery_subtitle"
        ).value =
        gallery.gallery_subtitle || "";



        document.getElementById(
            "image_title"
        ).value =
        gallery.image_title || "";



        document.getElementById(
            "short_description"
        ).value =
        gallery.short_description || "";



        document.getElementById(
            "full_description"
        ).value =
        gallery.full_description || "";



        document.getElementById(
            "category"
        ).value =
        gallery.category || "";



        document.getElementById(
            "button_name"
        ).value =
        gallery.button_name || "";



        document.getElementById(
            "button_link"
        ).value =
        gallery.button_link || "";



        document.getElementById(
            "status"
        ).value =
        gallery.status || "active";



        document.querySelector(
            "#galleryModal .modal-title"
        ).textContent =
        "Update Gallery";



        new bootstrap.Modal(
            document.getElementById(
                "galleryModal"
            )
        ).show();

    } catch (error) {

        console.error(
            error
        );

    }

}

// DELETE
async function removeGallery(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this gallery item?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteGallery(id);

        alert(
            "Gallery deleted successfully"
        );

        loadGallery();

    } catch (error) {

        console.error(
            error
        );

        alert(
            "Failed to delete gallery"
        );

    }

}

async function viewGallery(id) {

    try {

        const response =
        await getGalleryById(id);

        const gallery =
        response.data.data;

        document.getElementById(
            "viewGalleryContent"
        ).innerHTML = `

            <div class="row">

                <div class="col-md-12 text-center mb-3">

                    <img
                        src="${gallery.gallery_image}"
                        class="img-fluid rounded">

                </div>

                <div class="col-md-12">

                    <h4>
                        ${gallery.gallery_title}
                    </h4>

                    <p>
                        ${gallery.gallery_subtitle || ""}
                    </p>

                    <hr>

                    <p>
                        <strong>Category:</strong>
                        ${gallery.category || "-"}
                    </p>

                    <p>
                        <strong>Image Title:</strong>
                        ${gallery.image_title || "-"}
                    </p>

                    <p>
                        ${gallery.full_description || ""}
                    </p>

                </div>

            </div>

        `;

        new bootstrap.Modal(
            document.getElementById(
                "viewGalleryModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}