let contactInfoId = null;



document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadContactInformation();

        document
        .getElementById(
            "contactInformationForm"
        )
        ?.addEventListener(
            "submit",
            saveContactInformation
        );

    }
);


async function loadContactInformation() {

    try {

        const response =
        await getContactInformation();

        const data =
        response.data.data;

        if (!data) {

            document.getElementById(
                "contactInformationContent"
            ).innerHTML =
            `
            <div class="text-center">

                No contact information found

            </div>
            `;

            return;

        }

        contactInfoId =
        data.id;

        document.getElementById(
            "contactInformationContent"
        ).innerHTML = `

<div class="row">

<div class="col-md-6">

<p>
<strong>Office Name:</strong>
${data.office_name || "-"}
</p>

<p>
<strong>Address:</strong>
${data.address || "-"}
</p>

<p>
<strong>Primary Phone:</strong>
${data.primary_phone || "-"}
</p>

<p>
<strong>Secondary Phone:</strong>
${data.secondary_phone || "-"}
</p>

<p>
<strong>Office Hours:</strong>
${data.office_hours || "-"}
</p>

</div>

<div class="col-md-6">

<p>
<strong>Primary Email:</strong>
${data.primary_email || "-"}
</p>

<p>
<strong>Secondary Email:</strong>
${data.secondary_email || "-"}
</p>

<p>
<strong>Membership Phone:</strong>
${data.membership_phone || "-"}
</p>

<p>
<strong>Matrimony Phone:</strong>
${data.matrimony_phone || "-"}
</p>

<p>
<strong>Events Phone:</strong>
${data.events_phone || "-"}
</p>

</div>

</div>

`;

    } catch (error) {

        console.error(error);

    }

}

async function saveContactInformation(e) {

    e.preventDefault();

    try {

        const payload = {

            office_name:
            office_name.value,

            address:
            address.value,

            primary_phone:
            primary_phone.value,

            secondary_phone:
            secondary_phone.value,

            primary_email:
            primary_email.value,

            secondary_email:
            secondary_email.value,

            office_hours:
            office_hours.value,

            google_map_url:
            google_map_url.value,

            membership_phone:
            membership_phone.value,

            matrimony_phone:
            matrimony_phone.value,

            events_phone:
            events_phone.value,

            status:
            status.value

        };

        await updateContactInformation(
            contactInfoId,
            payload
        );

        alert(
            "Contact information updated successfully"
        );

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "contactInformationModal"
            )
        )
        ?.hide();

        loadContactInformation();

    } catch (error) {

        console.error(error);

    }

}

async function editContactInformation() {

    try {

        const response =
        await getContactInformation();

        const data =
        response.data.data;

        if (!data) {

            alert(
                "No contact information found"
            );

            return;

        }

        contactInfoId =
        data.id;

        document.getElementById(
            "office_name"
        ).value =
        data.office_name || "";

        document.getElementById(
            "address"
        ).value =
        data.address || "";

        document.getElementById(
            "primary_phone"
        ).value =
        data.primary_phone || "";

        document.getElementById(
            "secondary_phone"
        ).value =
        data.secondary_phone || "";

        document.getElementById(
            "primary_email"
        ).value =
        data.primary_email || "";

        document.getElementById(
            "secondary_email"
        ).value =
        data.secondary_email || "";

        document.getElementById(
            "office_hours"
        ).value =
        data.office_hours || "";

        document.getElementById(
            "google_map_url"
        ).value =
        data.google_map_url || "";

        document.getElementById(
            "membership_phone"
        ).value =
        data.membership_phone || "";

        document.getElementById(
            "matrimony_phone"
        ).value =
        data.matrimony_phone || "";

        document.getElementById(
            "events_phone"
        ).value =
        data.events_phone || "";

        document.getElementById(
            "status"
        ).value =
        data.status || "active";

        new bootstrap.Modal(
            document.getElementById(
                "contactInformationModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}