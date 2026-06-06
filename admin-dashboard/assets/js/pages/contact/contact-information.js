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

    } catch (error) {

        console.error(error);

    }

}



async function saveContactInformation(e) {

    e.preventDefault();

    try {

        const payload = {

            office_name:
            document.getElementById(
                "office_name"
            ).value,

            address:
            document.getElementById(
                "address"
            ).value,

            primary_phone:
            document.getElementById(
                "primary_phone"
            ).value,

            secondary_phone:
            document.getElementById(
                "secondary_phone"
            ).value,

            primary_email:
            document.getElementById(
                "primary_email"
            ).value,

            secondary_email:
            document.getElementById(
                "secondary_email"
            ).value,

            office_hours:
            document.getElementById(
                "office_hours"
            ).value,

            google_map_url:
            document.getElementById(
                "google_map_url"
            ).value,

            membership_phone:
            document.getElementById(
                "membership_phone"
            ).value,

            matrimony_phone:
            document.getElementById(
                "matrimony_phone"
            ).value,

            events_phone:
            document.getElementById(
                "events_phone"
            ).value,

            status:
            document.getElementById(
                "status"
            ).value

        };

        if (contactInfoId) {

            await updateContactInformation(
                contactInfoId,
                payload
            );

            alert(
                "Contact information updated successfully"
            );

        } else {

            await createContactInformation(
                payload
            );

            alert(
                "Contact information saved successfully"
            );

        }

        loadContactInformation();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}