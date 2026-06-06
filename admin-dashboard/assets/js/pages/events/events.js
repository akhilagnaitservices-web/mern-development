let masterEventId = null;

let masterEventsTable;

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

        await loadMasterEvents();

        

        document
        .getElementById(
            "masterEventForm"
        )
        ?.addEventListener(
            "submit",
            saveMasterEvent
        );

    }
);

async function loadMasterEvents() {

    try {

        const response =
        await getEvents();

        const events =
        response.data.data;

        let html = "";

        events.forEach(
            (
                event,
                index
            ) => {

                html += `

<tr>

<td>
${index + 1}
</td>

<td>

${
event.event_image
?
`
<img
src="${event.event_image}"
width="80"
class="rounded">
`
:
"-"
}

</td>

<td>
${event.event_title}
</td>

<td>
${event.event_category || "-"}
</td>

<td>
${formatDate(event.event_date)}
</td>

<td>
${event.city || "-"}
</td>

<td>

${
event.status === "upcoming"

?

`<span class="bg-primary-focus text-primary-main px-24 py-4 rounded-pill fw-medium text-sm">
Upcoming
</span>`

:

event.status === "ongoing"

?

`<span class="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
Ongoing
</span>`

:

event.status === "completed"

?

`<span class="bg-info-focus text-info-main px-24 py-4 rounded-pill fw-medium text-sm">
Completed
</span>`

:

`<span class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">
Cancelled
</span>`
}

</td>

<td>

<div class="d-flex align-items-center gap-10">

<a
class="w-32-px h-32-px bg-primary-light text-primary-600 rounded-circle d-flex justify-content-center align-items-center"
onclick="viewMasterEvent(${event.event_id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editMasterEvent(${event.event_id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeMasterEvent(${event.event_id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );


        
       if (masterEventsTable) {
    masterEventsTable.destroy();
}

document.getElementById(
    "masterEventsTableBody"
).innerHTML = html;

masterEventsTable =
new DataTable(
    "#masterEventsTable"
);

    } catch (error) {

        console.error(error);

    }

}

async function saveMasterEvent(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "masterEventForm"
        );

        const formData =
        new FormData(form);

        if (masterEventId) {

            await updateEvent(
                masterEventId,
                formData
            );

            alert(
                "Event updated successfully"
            );

        } else {

            await createEvent(
                formData
            );

            alert(
                "Event created successfully"
            );

        }

        form.reset();

        masterEventId = null;

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "masterEventModal"
            )
        )
        ?.hide();

        document.activeElement?.blur();

        await loadMasterEvents();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong"
        );

    }

}

async function editMasterEvent(id) {

    try {

        const response =
        await getEventById(id);

        const event =
        response.data.data;

        masterEventId = id;

       Object.keys(event)
       .forEach(key => {

       if (key === "event_image") {
           return;
       }

        const field =  document.getElementById(key);

   if (
    key === "event_date" &&
    event[key]
) {

    field.value =
    event[key]
    .split("T")[0];

} else {

    field.value =
    event[key] || "";

}

    });

        document.querySelector(
            "#masterEventModal .modal-title"
        ).textContent =
        "Update Event";

        new bootstrap.Modal(
            document.getElementById(
                "masterEventModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function removeMasterEvent(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this event?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteEvent(id);

        alert(
            "Event deleted successfully"
        );

        loadMasterEvents();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to delete event"
        );

    }

}

async function viewMasterEvent(id) {

    try {

        const response =
        await getEventById(id);

        const event =
        response.data.data;

        document.getElementById(
            "view_event_image"
        ).src =
        event.event_image || "";

        document.getElementById(
            "view_event_title"
        ).textContent =
        event.event_title || "-";

        document.getElementById(
            "view_event_category"
        ).textContent =
        event.event_category || "-";

        document.getElementById(
            "view_event_type"
        ).textContent =
        event.event_type || "-";

document.getElementById(
    "view_event_date"
).textContent =
formatDate(event.event_date);

        document.getElementById(
            "view_start_time"
        ).textContent =
        event.start_time || "-";

        document.getElementById(
            "view_end_time"
        ).textContent =
        event.end_time || "-";

        document.getElementById(
            "view_venue_name"
        ).textContent =
        event.venue_name || "-";

        document.getElementById(
            "view_city"
        ).textContent =
        event.city || "-";

        document.getElementById(
            "view_state"
        ).textContent =
        event.state || "-";

        document.getElementById(
            "view_pincode"
        ).textContent =
        event.pincode || "-";

        document.getElementById(
            "view_organized_by"
        ).textContent =
        event.organized_by || "-";

        document.getElementById(
            "view_open_to"
        ).textContent =
        event.open_to || "-";

        document.getElementById(
            "view_contact_person"
        ).textContent =
        event.contact_person || "-";

        document.getElementById(
            "view_contact_phone"
        ).textContent =
        event.contact_phone || "-";

        document.getElementById(
            "view_contact_email"
        ).textContent =
        event.contact_email || "-";

        document.getElementById(
            "view_registration_link"
        ).innerHTML =
        event.registration_link
        ? `<a href="${event.registration_link}" target="_blank">${event.registration_link}</a>`
        : "-";

        document.getElementById(
            "view_event_description"
        ).innerHTML =
        event.event_description || "-";

        new bootstrap.Modal(
            document.getElementById(
                "viewMasterEventModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}