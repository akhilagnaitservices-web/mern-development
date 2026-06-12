let newsId = null;

let newsTable;



function formatDate(dateString) {

    if (!dateString) {

        return "-";

    }

    return new Date(dateString)
    .toLocaleDateString(
        "en-IN",
        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }
    );

}

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadCategoriesDropdown();

        await loadNews();

        document
        .getElementById(
            "newsForm"
        )
        ?.addEventListener(
            "submit",
            saveNews
        );

    }
);

async function loadCategoriesDropdown() {

    try {

        const response =
        await getNewsCategories();

        const categories =
        response.data.data;

        let html =
        `
        <option value="">
        Select Category
        </option>
        `;

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
        ).innerHTML =
        html;

    } catch (error) {

        console.error(error);

    }

}

async function loadNews() {

    try {

        const response =
        await getNews();

        const newsList =
        response.data.data;

        let html = "";

        newsList.forEach(
            (
                news,
                index
            ) => {

                html += `

<tr>

<td>

${
news.featured_image

?

`
<img
src="${news.featured_image}"
width="80"
class="rounded">
`

:

"-"

}

</td>

<td>
${news.news_title}
</td>

<td>
${news.category_name || "-"}
</td>

<td>
${news.author_name || "-"}
</td>

<td>
${formatDate(news.news_date)}
</td>

<td>
${news.view_count}
</td>

<td>

${
news.popular_news === "Yes"

?

`<span class="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
Popular
</span>`

:

`<span class="bg-secondary-focus text-secondary-main px-24 py-4 rounded-pill fw-medium text-sm">
No
</span>`

}

</td>

<td>

${getStatusBadge(
    news.status
)}

</td>

<td>

<div class="d-flex align-items-center gap-10">

<a
class="w-32-px h-32-px bg-primary-light text-primary-600 rounded-circle d-flex justify-content-center align-items-center"
onclick="viewNews(${news.news_id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editNews(${news.news_id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeNews(${news.news_id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );

        if (newsTable) {

            newsTable.destroy();

        }

        document.getElementById(
            "newsTableBody"
        ).innerHTML =
        html;

        newsTable =
        new DataTable(
            "#dataTable"
        );

    } catch (error) {

        console.error(error);

    }

}

function getStatusBadge(status) {

    switch (status) {

        case "Published":

            return `
            <span class="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
            Published
            </span>
            `;

        case "Draft":

            return `
            <span class="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm">
            Draft
            </span>
            `;

        default:

            return `
            <span class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">
            Archived
            </span>
            `;

    }

}

async function saveNews(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "newsForm"
        );

        const formData =
        new FormData(form);

        if (newsId) {

            await updateNews(
                newsId,
                formData
            );

            alert(
                "News updated successfully"
            );

        } else {

            await createNews(
                formData
            );

            alert(
                "News created successfully"
            );

        }

        form.reset();

        newsId = null;

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "newsModal"
            )
        )
        ?.hide();

        document.activeElement?.blur();

        await loadNews();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}

async function editNews(id) {

    try {

        const response =
        await getNewsById(id);

        const news =
        response.data.data;

        newsId = id;

        Object.keys(news)
        .forEach(key => {

            if (
                key === "featured_image" ||
                key === "news_slug" ||
                key === "view_count" ||
                key === "category_name"
            ) {

                return;

            }

            const field =
            document.getElementById(key);

            if (!field) {

                return;

            }

            if (
                key === "news_date" &&
                news[key]
            ) {

                field.value =
                news[key]
                .split("T")[0];

            } else {

                field.value =
                news[key] || "";

            }

        });

        if (
            news.featured_image
        ) {

            document.getElementById(
                "featured_image_preview"
            ).src =
            news.featured_image;

        }

        document.querySelector(
            "#newsModal .modal-title"
        ).textContent =
        "Update News";

        new bootstrap.Modal(
            document.getElementById(
                "newsModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function viewNews(id) {

    try {

        const response =
        await getNewsById(id);

        const news =
        response.data.data;

        document.getElementById(
            "viewNewsContent"
        ).innerHTML = `

<div class="row">

<div class="col-md-12 text-center mb-4">

<img
src="${news.featured_image || ''}"
class="img-fluid rounded shadow"
style="
max-height:300px;
object-fit:cover;
">

</div>

<div class="col-md-6">

<table class="table table-bordered">

<tr>
<th width="180">
Category
</th>
<td>
${news.category_name || "-"}
</td>
</tr>

<tr>
<th>
Author
</th>
<td>
${news.author_name || "-"}
</td>
</tr>

<tr>
<th>
News Date
</th>
<td>
${formatDate(news.news_date)}
</td>
</tr>

<tr>
<th>
Views
</th>
<td>
${news.view_count}
</td>
</tr>

</table>

</div>

<div class="col-md-6">

<table class="table table-bordered">

<tr>
<th>
Popular News
</th>
<td>
${news.popular_news}
</td>
</tr>

<tr>
<th>
Display Order
</th>
<td>
${news.display_order}
</td>
</tr>

<tr>
<th>
Status
</th>
<td>
${news.status}
</td>
</tr>

</table>

</div>

<div class="col-md-12 mt-3">

<h6>
News Title
</h6>

<div class="border rounded p-3">

${news.news_title}

</div>

</div>

<div class="col-md-12 mt-3">

<h6>
Short Description
</h6>

<div class="border rounded p-3">

${news.short_description || "-"}

</div>

</div>

<div class="col-md-12 mt-3">

<h6>
News Content
</h6>

<div class="border rounded p-3">

${news.news_content || "-"}

</div>

</div>

</div>

`;

        new bootstrap.Modal(
            document.getElementById(
                "viewNewsModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function removeNews(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this news?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteNews(id);

        alert(
            "News deleted successfully"
        );

        await loadNews();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to delete news"
        );

    }

}

document
.getElementById(
    "featured_image"
)
?.addEventListener(
    "change",
    function (e) {

        const file =
        e.target.files[0];

        if (!file) {

            return;

        }

        document.getElementById(
            "featured_image_preview"
        ).src =
        URL.createObjectURL(
            file
        );

    }
);