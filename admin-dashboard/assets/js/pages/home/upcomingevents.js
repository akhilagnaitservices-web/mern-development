let eventId = null;



document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadEvents();

        document
        .getElementById(
            "eventForm"
        )
        ?.addEventListener(
            "submit",
            saveEvent
        );

    }
);




// LOAD EVENTS
async function loadEvents() {

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
                                ? `
                                    <img
                                        src="${event.event_image}"
                                        width="80"
                                        class="rounded"
                                    >
                                `
                                : "-"
                            }

                        </td>

                        <td>
                            ${event.event_title}
                        </td>

                        <td>
                            ${event.event_date || "-"}
                        </td>

                        <td>
                            ${event.venue || "-"}
                        </td>

                        <td>

                            <span class="badge bg-primary">

                                ${event.status}

                            </span>

                        </td>

                        <td>

                            <button
                                class="btn btn-sm btn-info"
                                onclick="editEvent(${event.id})">

                                Edit

                            </button>

                            <button
                                class="btn btn-sm btn-danger"
                                onclick="removeEvent(${event.id})">

                                Delete

                            </button>

                        </td>

                    </tr>
                `;

            }
        );

        document.getElementById(
            "eventTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(
            error
        );

    }

}




// CREATE / UPDATE EVENT
async function saveEvent(e) {

    e.preventDefault();

    try {

        const form =
        document.getElementById(
            "eventForm"
        );

        const formData =
        new FormData(form);

        if (eventId) {

            await updateEvent(
                eventId,
                formData
            );

            toastr.success(
                "Event updated successfully"
            );

        } else {

            await createEvent(
                formData
            );

            toastr.success(
                "Event created successfully"
            );

        }

        form.reset();

        eventId = null;

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "eventModal"
            )
        )
        ?.hide();

        loadEvents();

    } catch (error) {

        console.error(
            error
        );

        toastr.error(
            "Something went wrong"
        );

    }

}




// EDIT EVENT
async function editEvent(id) {

    try {

        const response =
        await getEventById(id);

        const event =
        response.data.data;

        eventId = id;

        document.getElementById(
            "event_title"
        ).value =
        event.event_title || "";



        document.getElementById(
            "event_subtitle"
        ).value =
        event.event_subtitle || "";



        document.getElementById(
            "short_description"
        ).value =
        event.short_description || "";



        document.getElementById(
            "full_description"
        ).value =
        event.full_description || "";



        document.getElementById(
            "event_date"
        ).value =
        event.event_date || "";



        document.getElementById(
            "event_time"
        ).value =
        event.event_time || "";



        document.getElementById(
            "venue"
        ).value =
        event.venue || "";



        document.getElementById(
            "button_name"
        ).value =
        event.button_name || "";



        document.getElementById(
            "button_link"
        ).value =
        event.button_link || "";



        document.getElementById(
            "status"
        ).value =
        event.status || "upcoming";



        new bootstrap.Modal(
            document.getElementById(
                "eventModal"
            )
        ).show();

    } catch (error) {

        console.error(
            error
        );

    }

}




// DELETE EVENT
async function removeEvent(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this event?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteEvent(id);

        toastr.success(
            "Event deleted successfully"
        );

        loadEvents();

    } catch (error) {

        console.error(
            error
        );

        toastr.error(
            "Failed to delete event"
        );

    }

}