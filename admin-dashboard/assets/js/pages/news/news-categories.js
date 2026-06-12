let editId = null;
let newsCategoriesTable;

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadNewsCategories();

        newsCategoriesTable =
        new DataTable(
            "#dataTable"
        );

        document
        .getElementById(
            "newsCategoryForm"
        )
        ?.addEventListener(
            "submit",
            saveNewsCategory
        );

    }
);

async function loadNewsCategories() {

    try {

        const response =
        await getNewsCategories();

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
${category.category_name}
</td>

<td>
${category.category_slug}
</td>

<td>
${category.display_order}
</td>

<td>

${category.status === "Active"

? `<span class="badge bg-success">
Active
</span>`

: `<span class="badge bg-danger">
Inactive
</span>`

}

</td>

<td>

<div class="d-flex gap-2">

<button
class="btn btn-sm btn-info"
onclick="viewNewsCategory(${category.category_id})">

<i class="ri-eye-line"></i>

</button>

<button
class="btn btn-sm btn-primary"
onclick="editNewsCategory(${category.category_id})">

<i class="ri-edit-line"></i>

</button>

<button
class="btn btn-sm btn-danger"
onclick="removeNewsCategory(${category.category_id})">

<i class="ri-delete-bin-line"></i>

</button>

</div>

</td>

</tr>

`;

            }
        );

        document.getElementById(
            "newsCategoriesTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function saveNewsCategory(e) {

    e.preventDefault();

    try {

        const payload = {

            category_name:
            category_name.value,

            category_slug:
            category_slug.value,

            display_order:
            display_order.value,

            status:
            status.value

        };

        if (editId) {

            await updateNewsCategory(
                editId,
                payload
            );

        } else {

            await createNewsCategory(
                payload
            );

        }

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "newsCategoryModal"
            )
        )
        ?.hide();

        document
        .getElementById(
            "newsCategoryForm"
        )
        .reset();

        editId = null;

        loadNewsCategories();

    } catch (error) {

        console.error(error);

    }

}

async function editNewsCategory(id) {

    try {

        const response =
        await getNewsCategoryById(id);

        const category =
        response.data.data;

        editId = id;

        category_name.value =
        category.category_name;

        category_slug.value =
        category.category_slug;

        display_order.value =
        category.display_order;

        status.value =
        category.status;

        document.querySelector(
            "#newsCategoryModal .modal-title"
        ).innerText =
        "Edit News Category";

        new bootstrap.Modal(
            document.getElementById(
                "newsCategoryModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function viewNewsCategory(id) {

    const response =
    await getNewsCategoryById(id);

    const category =
    response.data.data;

    document.getElementById(
        "viewNewsCategoryContent"
    ).innerHTML = `

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

</table>

`;

    new bootstrap.Modal(
        document.getElementById(
            "viewNewsCategoryModal"
        )
    ).show();

}

async function removeNewsCategory(id) {

    if (
        !confirm(
            "Delete this category?"
        )
    ) {

        return;

    }

    try {

        await deleteNewsCategory(id);

        loadNewsCategories();

    } catch (error) {

        console.error(error);

    }

}