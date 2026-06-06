let registrationsTable;




document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadRegistrations();

        registrationsTable =
        new DataTable(
            "#dataTable"
        );

    }
);

async function loadRegistrations() {

    try {

        const response =
        await getEventRegistrations();

        const registrations =
        response.data.data;

        let html = "";

        registrations.forEach(
            (
                registration,
                index
            ) => {

                html += `

<tr>

<td>
${index + 1}
</td>

<td>
${registration.event_title || "-"}
</td>

<td>
${registration.full_name}
</td>

<td>
${registration.mobile_number}
</td>

<td>
${registration.email || "-"}
</td>

<td>
${registration.members_count}
</td>

<td>

<span class="bg-primary-focus text-primary-main px-24 py-4 rounded-pill fw-medium text-sm">

${registration.registration_status || "pending"}

</span>

</td>

<td>
${formatDateTime(
    registration.registration_date
)}
</td>

<td>

<div class="d-flex align-items-center gap-10">

<a
class="w-32-px h-32-px bg-primary-light text-primary-600 rounded-circle d-flex justify-content-center align-items-center"
onclick="viewRegistration(${registration.registration_id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeRegistration(${registration.registration_id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );

        document.getElementById(
            "registrationTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function viewRegistration(id) {

    try {

        const response =
        await getEventRegistrationById(id);

        const registration =
        response.data.data;

        document.getElementById(
            "viewRegistrationContent"
        ).innerHTML = `

<table class="table table-bordered">

<tr>
<th>Event</th>
<td>${registration.event_title}</td>
</tr>

<tr>
<th>Full Name</th>
<td>${registration.full_name}</td>
</tr>

<tr>
<th>Mobile</th>
<td>${registration.mobile_number}</td>
</tr>

<tr>
<th>Email</th>
<td>${registration.email || "-"}</td>
</tr>

<tr>
<th>Members Count</th>
<td>${registration.members_count}</td>
</tr>

<tr>
<th>Status</th>
<td>${registration.registration_status || "pending"}</td>
</tr>

<tr>
<th>Remarks</th>
<td>${registration.remarks || "-"}</td>
</tr>

<tr>
<th>Registered On</th>
<td>${formatDateTime(
    registration.registration_date
)}</td>
</tr>

</table>

`;

        new bootstrap.Modal(
            document.getElementById(
                "viewRegistrationModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function removeRegistration(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this registration?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteEventRegistration(id);

        alert(
            "Registration deleted successfully"
        );

        loadRegistrations();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to delete registration"
        );

    }

}