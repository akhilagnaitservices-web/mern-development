let bannerId = null;
let bannerTable;

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadBanners();

        bannerTable =
        new DataTable(
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
        response.data.data;

        let html = "";

        banners.forEach(
            (banner, index) => {

                html += `
                    <tr>

                        <td>${index + 1}</td>

                        <td>

                            ${
                                banner.banner_image
                                ? `
                                <img
                                    src="${banner.banner_image}"
                                    width="80"
                                    class="rounded">
                                `
                                : "-"
                            }

                        </td>

                        <td>${banner.page_name}</td>

                        <td>${banner.banner_title}</td>

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
onclick="removeBanner(${banner.id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

                        </td>

                    </tr>
                `;
            }
        );

        document.getElementById(
            "bannerTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function saveBanner(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "bannerForm"
        );

        const formData =
        new FormData(form);

        if (bannerId) {

            await updateBanner(
                bannerId,
                formData
            );

            alert(
                "Banner updated successfully"
            );

        } else {

            await createBanner(
                formData
            );

            alert(
                "Banner created successfully"
            );

        }

        form.reset();

        bannerId = null;

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "bannerModal"
            )
        )
        ?.hide();

        loadBanners();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}

async function editBanner(id) {

    try {

        const response =
        await getBannerById(id);

        const banner =
        response.data.data;

        bannerId = id;

        document.getElementById(
            "page_name"
        ).value =
        banner.page_name || "";

        document.getElementById(
            "banner_title"
        ).value =
        banner.banner_title || "";

        document.getElementById(
            "banner_subtitle"
        ).value =
        banner.banner_subtitle || "";

        document.getElementById(
            "status"
        ).value =
        banner.status || "active";

        document.querySelector(
            "#bannerModal .modal-title"
        ).textContent =
        "Update Banner";

        new bootstrap.Modal(
            document.getElementById(
                "bannerModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function removeBanner(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this banner?"
    );

    if (!confirmed) return;

    try {

        await deleteBanner(id);

        alert(
            "Banner deleted successfully"
        );

        loadBanners();

    } catch (error) {

        console.error(error);

    }

}

async function viewBanner(id) {

    try {

        const response =
        await getBannerById(id);

        const banner =
        response.data.data;

        document.getElementById(
            "viewBannerContent"
        ).innerHTML = `

            <div class="text-center">

                <img
                    src="${banner.banner_image}"
                    class="img-fluid rounded mb-3">

                <h4>
                    ${banner.banner_title}
                </h4>

                <p>
                    ${banner.banner_subtitle || ""}
                </p>

                <hr>

                <p>
                    <strong>Page Name:</strong>
                    ${banner.page_name}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${banner.status}
                </p>

            </div>

        `;

        new bootstrap.Modal(
            document.getElementById(
                "viewBannerModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}