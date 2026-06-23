let headerId = null;

let socialMediaId = null;

let footerLinkId = null;

let socialMediaTable;

let footerLinksTable;



document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadHeader();

        await loadSocialMediaLinks();

        await loadFooterLinks();



        document
        .getElementById(
            "headerForm"
        )
        ?.addEventListener(
            "submit",
            saveHeader
        );



        document
        .getElementById(
            "socialMediaForm"
        )
        ?.addEventListener(
            "submit",
            saveSocialMediaLink
        );



        document
        .getElementById(
            "footerLinkForm"
        )
        ?.addEventListener(
            "submit",
            saveFooterLink
        );

    }
);

async function loadHeader() {

    try {

        const response =
        await getHeader();

        const header =
        response.data.data;

        if (!header) {

            return;

        }

        headerId =
        header.id;

        document.getElementById(
            "name"
        ).value =
        header.name || "";

        document.getElementById(
            "phone_number"
        ).value =
        header.phone_number || "";

        document.getElementById(
            "email"
        ).value =
        header.email || "";

        document.getElementById(
            "website"
        ).value =
        header.website || "";

        document.getElementById(
            "location"
        ).value =
        header.location || "";

        document.getElementById(
            "google_location"
        ).value =
        header.google_location || "";

        document.getElementById(
            "address"
        ).value =
        header.address || "";

        document.getElementById(
            "description"
        ).value =
        header.description || "";

        document.getElementById(
            "copyright_text"
        ).value =
        header.copyright_text || "";

        document.getElementById(
            "status"
        ).value =
        header.status || "active";



        if (
            header.logo
        ) {

            document.getElementById(
                "logo_preview"
            ).src =
            header.logo;

        }



        if (
            header.footer_logo
        ) {

            document.getElementById(
                "footer_logo_preview"
            ).src =
            header.footer_logo;

        }

    } catch (error) {

        console.error(error);

    }

}

async function saveHeader(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "headerForm"
        );

        const formData =
        new FormData(form);

        if (headerId) {

            await updateHeader(
                headerId,
                formData
            );

            alert(
                "Header updated successfully"
            );

        } else {

            await createHeader(
                formData
            );

            alert(
                "Header created successfully"
            );

        }

        await loadHeader();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}

document
.getElementById(
    "logo"
)
?.addEventListener(
    "change",
    function(e){

        const file =
        e.target.files[0];

        if(!file) return;

        document.getElementById(
            "logo_preview"
        ).src =
        URL.createObjectURL(file);

    }
);



document
.getElementById(
    "footer_logo"
)
?.addEventListener(
    "change",
    function(e){

        const file =
        e.target.files[0];

        if(!file) return;

        document.getElementById(
            "footer_logo_preview"
        ).src =
        URL.createObjectURL(file);

    }
);

async function loadSocialMediaLinks() {

    try {

        const response =
        await getSocialMediaLinks();

        const links =
        response.data.data;

        let html = "";

        links.forEach(
            (
                link,
                index
            ) => {

                html += `

<tr>

<td>
${index + 1}
</td>

<td>
${link.platform_name}
</td>

<td>

<a
href="${link.platform_link}"
target="_blank">

${link.platform_link}

</a>

</td>

<td>
${link.link_order}
</td>

<td>

${
link.status === "active"

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
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editSocialMediaLink(${link.id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeSocialMediaLink(${link.id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );

        if (socialMediaTable) {

            socialMediaTable.destroy();

        }

        document.getElementById(
            "socialMediaTableBody"
        ).innerHTML =
        html;

        socialMediaTable =
        new DataTable(
            "#socialMediaTable"
        );

    } catch (error) {

        console.error(error);

    }

}

async function editSocialMediaLink(id) {

    try {

        const response =
        await getSocialMediaLinks();

        const links =
        response.data.data;

        const link =
        links.find(
            item =>
            item.id === id
        );

        if (!link) {

            return;

        }

        socialMediaId =
        id;

        document.getElementById(
            "platform_name"
        ).value =
        link.platform_name || "";

        document.getElementById(
            "platform_link"
        ).value =
        link.platform_link || "";

        document.getElementById(
            "link_order"
        ).value =
        link.link_order || 0;

        document.getElementById(
            "social_status"
        ).value =
        link.status || "active";

        document.querySelector(
            "#socialMediaModal .modal-title"
        ).textContent =
        "Update Social Media Link";

        new bootstrap.Modal(
            document.getElementById(
                "socialMediaModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function removeSocialMediaLink(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this social media link?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteSocialMediaLink(id);

        alert(
            "Social Media Link deleted successfully"
        );

        await loadSocialMediaLinks();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to delete social media link"
        );

    }

}



async function saveSocialMediaLink(e) {

    e.preventDefault();

    try {

        const payload = {

            platform_name:
            document.getElementById(
                "platform_name"
            ).value,

            platform_link:
            document.getElementById(
                "platform_link"
            ).value,

            link_order:
            document.getElementById(
                "link_order"
            ).value,

            status:
            document.getElementById(
                "social_status"
            ).value

        };

        if (socialMediaId) {

            await updateSocialMediaLink(
                socialMediaId,
                payload
            );

        } else {

            await createSocialMediaLink(
                payload
            );

        }

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "socialMediaModal"
            )
        )
        ?.hide();

        document
        .getElementById(
            "socialMediaForm"
        )
        .reset();

        socialMediaId = null;

        loadSocialMediaLinks();

    } catch (error) {

        console.error(error);

    }

}

function resetSocialMediaForm() {

    socialMediaId =
    null;

    document
    .getElementById(
        "socialMediaForm"
    )
    .reset();



    document.querySelector(
        "#socialMediaModal .modal-title"
    ).textContent =
    "Add Social Media Link";

}

document
.getElementById(
    "socialMediaModal"
)
?.addEventListener(
    "hidden.bs.modal",
    resetSocialMediaForm
);

async function loadFooterLinks() {

    try {

        const response =
        await getFooterQuickLinks();

        const links =
        response.data.data;

        let html = "";

        links.forEach(
            (
                link,
                index
            ) => {

                html += `

<tr>

<td>
${index + 1}
</td>

<td>
${link.link_name}
</td>

<td>

<a
href="${link.link_url}"
target="_blank">

${link.link_url}

</a>

</td>

<td>
${link.link_order}
</td>

<td>

${
link.status === "active"

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
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editFooterLink(${link.id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeFooterLink(${link.id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );

        if (
            footerLinksTable
        ) {

            footerLinksTable.destroy();

        }

        document.getElementById(
            "footerLinksTableBody"
        ).innerHTML =
        html;

        footerLinksTable =
        new DataTable(
            "#footerLinksTable"
        );

    } catch (error) {

        console.error(error);

    }

}
async function saveFooterLink(e) {

    e.preventDefault();

    try {

        const payload = {

            link_name:
            document.getElementById(
                "link_name"
            ).value,

            link_url:
            document.getElementById(
                "link_url"
            ).value,

            link_order:
            document.getElementById(
                "footer_link_order"
            ).value,

            status:
            document.getElementById(
                "footer_status"
            ).value

        };

        if (
            footerLinkId
        ) {

            await updateFooterQuickLink(

                footerLinkId,

                payload

            );

            alert(
                "Footer Link updated successfully"
            );

        } else {

            await createFooterQuickLink(
                payload
            );

            alert(
                "Footer Link created successfully"
            );

        }

        document
        .getElementById(
            "footerLinkForm"
        )
        .reset();

        footerLinkId =
        null;

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "footerLinkModal"
            )
        )
        ?.hide();

        await loadFooterLinks();

    } catch (error) {

        console.error(error);

    }

}
async function editFooterLink(id) {

    try {

        const response =
        await getFooterQuickLinks();

        const links =
        response.data.data;

        const link =
        links.find(
            item =>
            item.id === id
        );

        if (!link) {

            return;

        }

        footerLinkId =
        id;

        document.getElementById(
            "link_name"
        ).value =
        link.link_name || "";

        document.getElementById(
            "link_url"
        ).value =
        link.link_url || "";

        document.getElementById(
            "footer_link_order"
        ).value =
        link.link_order || 0;

        document.getElementById(
            "footer_status"
        ).value =
        link.status || "active";

        document.querySelector(
            "#footerLinkModal .modal-title"
        ).textContent =
        "Update Footer Link";

        new bootstrap.Modal(
            document.getElementById(
                "footerLinkModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}
async function removeFooterLink(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this footer link?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteFooterQuickLink(
            id
        );

        alert(
            "Footer Link deleted successfully"
        );

        await loadFooterLinks();

    } catch (error) {

        console.error(error);

    }

}


function resetSocialMediaForm() {

    socialMediaId =
    null;

    document
    .getElementById(
        "socialMediaForm"
    )
    .reset();

    document.querySelector(
        "#socialMediaModal .modal-title"
    ).textContent =
    "Add Social Media Link";

}

function resetFooterForm() {

    footerLinkId = null;

    document
    .getElementById(
        "footerLinkForm"
    )
    ?.reset();

    document.querySelector(
        "#footerLinkModal .modal-title"
    ).textContent =
    "Add Footer Link";

}

document
.getElementById(
    "footerLinkModal"
)
?.addEventListener(
    "hidden.bs.modal",
    resetFooterForm
);