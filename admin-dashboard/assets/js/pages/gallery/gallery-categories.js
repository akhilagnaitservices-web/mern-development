let categoryId = null;
let galleryCategoriesTable;

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadGalleryCategories();

        galleryCategoriesTable =
        new DataTable(
            "#dataTable"
        );

        document
        .getElementById(
            "galleryCategoryForm"
        )
        ?.addEventListener(
            "submit",
            saveGalleryCategory
        );

    }
);

async function loadGalleryCategories() {

    try {

        const response =
        await getGalleryCategories();

        const categories =
        response.data.data;

        let html = "";

        categories.forEach(
            (
                category,
                index
            ) => {

                html += `

<tr>

<td>
${index + 1}
</td>

<td>
<i class="${category.category_icon} fs-4"></i>
</td>

<td>
${category.category_name}
</td>

<td>
${category.display_order}
</td>

<td>

${
category.status === "active"

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
onclick="viewGalleryCategory(${category.category_id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editGalleryCategory(${category.category_id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeGalleryCategory(${category.category_id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );

        document.getElementById(
            "galleryCategoryTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}


async function saveGalleryCategory(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "galleryCategoryForm"
        );

        const formData = {

            category_name:
            document.getElementById(
                "category_name"
            ).value,

            category_icon:
            document.getElementById(
                "category_icon"
            ).value,

            display_order:
            document.getElementById(
                "display_order"
            ).value,

            status:
            document.getElementById(
                "status"
            ).value

        };

        if (categoryId) {

            await updateGalleryCategory(
                categoryId,
                formData
            );

            alert(
                "Category updated successfully"
            );

        } else {

            await createGalleryCategory(
                formData
            );

            alert(
                "Category created successfully"
            );

        }

        form.reset();

        categoryId = null;

        document.querySelector(
            "#galleryCategoryModal .modal-title"
        ).textContent =
        "Add Category";

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "galleryCategoryModal"
            )
        )
        ?.hide();

        loadGalleryCategories();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}

async function editGalleryCategory(id) {

    try {

        const response =
        await getGalleryCategoryById(id);

        const category =
        response.data.data;

        categoryId = id;

        document.getElementById(
            "category_name"
        ).value =
        category.category_name || "";

        document.getElementById(
            "category_icon"
        ).value =
        category.category_icon || "";

        document.getElementById(
            "display_order"
        ).value =
        category.display_order || 0;

        document.getElementById(
            "status"
        ).value =
        category.status || "active";

        document.querySelector(
            "#galleryCategoryModal .modal-title"
        ).textContent =
        "Update Category";

        new bootstrap.Modal(
            document.getElementById(
                "galleryCategoryModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function viewGalleryCategory(id) {

    try {

        const response =
        await getGalleryCategoryById(id);

        const category =
        response.data.data;

        document.getElementById(
            "viewGalleryCategoryContent"
        ).innerHTML = `

<div class="row">

<div class="col-md-3 text-center">

<i
class="${category.category_icon}"
style="font-size:70px;">
</i>

</div>

<div class="col-md-9">

<table class="table table-bordered">

<tr>

<th width="200">
Category Name
</th>

<td>
${category.category_name}
</td>

</tr>

<tr>

<th>
Slug
</th>

<td>
${category.category_slug}
</td>

</tr>

<tr>

<th>
Display Order
</th>

<td>
${category.display_order}
</td>

</tr>

<tr>

<th>
Status
</th>

<td>
${category.status}
</td>

</tr>

<tr>

<th>
Created At
</th>

<td>
${formatDateTime(
    category.created_at
)}
</td>

</tr>

<tr>

<th>
Updated At
</th>

<td>
${formatDateTime(
    category.updated_at
)}
</td>

</tr>

</table>

</div>

</div>

`;

        new bootstrap.Modal(
            document.getElementById(
                "viewGalleryCategoryModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function removeGalleryCategory(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this category?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteGalleryCategory(id);

        alert(
            "Category deleted successfully"
        );

        loadGalleryCategories();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Failed to delete category"
        );

    }

}