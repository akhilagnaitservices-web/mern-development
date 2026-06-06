let videoId = null;
let galleryVideosTable;

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadAlbumsDropdown();

        await loadGalleryVideos();

        galleryVideosTable =
        new DataTable(
            "#dataTable"
        );

        document
        .getElementById(
            "galleryVideoForm"
        )
        ?.addEventListener(
            "submit",
            saveGalleryVideo
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



async function loadGalleryVideos() {

    try {

        const response =
        await getGalleryVideos();

        const videos =
        response.data.data;

        let html = "";

        videos.forEach(
            (
                video,
                index
            ) => {

                html += `

<tr>

<td>
${index + 1}
</td>

<td>

${
video.thumbnail_image
?
`
<img
src="${video.thumbnail_image}"
width="80"
class="rounded">
`
:
"-"
}

</td>

<td>
${video.album_title || "-"}
</td>

<td>
${video.video_title}
</td>

<td>

<a
href="${video.video_url}"
target="_blank">

View Video

</a>

</td>

<td>

${
video.status === "active"

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
onclick="viewGalleryVideo(${video.video_id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editGalleryVideo(${video.video_id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeGalleryVideo(${video.video_id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );

        document.getElementById(
            "galleryVideosTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}



async function saveGalleryVideo(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "galleryVideoForm"
        );

        const formData =
        new FormData(form);

        if (videoId) {

            await updateGalleryVideo(
                videoId,
                formData
            );

            alert(
                "Video updated successfully"
            );

        } else {

            await createGalleryVideo(
                formData
            );

            alert(
                "Video created successfully"
            );

        }

        form.reset();

        videoId = null;

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "galleryVideoModal"
            )
        )
        ?.hide();

        loadGalleryVideos();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}



async function editGalleryVideo(id) {

    try {

        const response =
        await getGalleryVideoById(id);

        const video =
        response.data.data;

        videoId = id;

        document.getElementById(
            "album_id"
        ).value =
        video.album_id;

        document.getElementById(
            "video_title"
        ).value =
        video.video_title || "";

        document.getElementById(
            "video_url"
        ).value =
        video.video_url || "";

        document.getElementById(
            "video_description"
        ).value =
        video.video_description || "";

        document.getElementById(
            "display_order"
        ).value =
        video.display_order || 0;

        document.getElementById(
            "status"
        ).value =
        video.status || "active";

        document.querySelector(
            "#galleryVideoModal .modal-title"
        ).textContent =
        "Update Video";

        new bootstrap.Modal(
            document.getElementById(
                "galleryVideoModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}



async function viewGalleryVideo(id) {

    try {

        const response =
        await getGalleryVideoById(id);

        const video =
        response.data.data;

        document.getElementById(
            "viewGalleryVideoContent"
        ).innerHTML = `

<div class="row">

<div class="col-md-4 text-center">

${
video.thumbnail_image
?
`
<img
src="${video.thumbnail_image}"
class="img-fluid rounded shadow">
`
:
""
}

</div>

<div class="col-md-8">

<table class="table table-bordered">

<tr>
<th>Album</th>
<td>${video.album_title || "-"}</td>
</tr>

<tr>
<th>Video Title</th>
<td>${video.video_title}</td>
</tr>

<tr>
<th>Video URL</th>
<td>
<a href="${video.video_url}" target="_blank">
${video.video_url}
</a>
</td>
</tr>

<tr>
<th>Display Order</th>
<td>${video.display_order}</td>
</tr>

<tr>
<th>Status</th>
<td>${video.status}</td>
</tr>

</table>

<p>
${video.video_description || "-"}
</p>

</div>

</div>

`;

        new bootstrap.Modal(
            document.getElementById(
                "viewGalleryVideoModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}



async function removeGalleryVideo(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this video?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteGalleryVideo(id);

        alert(
            "Video deleted successfully"
        );

        loadGalleryVideos();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to delete video"
        );

    }

}