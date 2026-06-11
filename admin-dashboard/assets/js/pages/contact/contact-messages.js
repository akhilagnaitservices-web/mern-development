let messagesTable;


document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadContactMessages();

        messagesTable =
        new DataTable(
            "#dataTable"
        );

    }
);

async function loadContactMessages() {

    try {

        const response =
        await getContactMessages();

        const messages =
        response.data.data;

        let html = "";

        messages.forEach(
            (
                message,
                index
            ) => {

                html += `

<tr>

<td>
${index + 1}
</td>

<td>
${message.contact_id}
</td>

<td>
${message.full_name}
</td>

<td>
${message.email}
</td>

<td>
${message.subject}
</td>

<td>

${getStatusBadge(
    message.status
)}

</td>

<td>

${formatDateTime(
    message.created_at
)}

</td>

<td>

<div class="d-flex align-items-center gap-10">

<a
class="w-32-px h-32-px bg-primary-light text-primary-600 rounded-circle d-flex justify-content-center align-items-center"
onclick="viewContactMessage(${message.id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeContactMessage(${message.id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

</td>

</tr>

`;

            }
        );

        document.getElementById(
            "contactMessagesTableBody"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function viewContactMessage(id) {

    try {

        const response =
        await getContactMessageById(id);

        const message =
        response.data.data;

        document.getElementById(
            "viewContactMessageContent"
        ).innerHTML = `

<div class="row">

<div class="col-md-6">

<table class="table table-bordered">

<tr>
<th width="180">
Contact ID
</th>
<td>
${message.contact_id}
</td>
</tr>

<tr>
<th>
Full Name
</th>
<td>
${message.full_name}
</td>
</tr>

<tr>
<th>
Email
</th>
<td>
${message.email}
</td>
</tr>

<tr>
<th>
Phone
</th>
<td>
${message.phone_number || "-"}
</td>
</tr>

<tr>
<th>
Subject
</th>
<td>
${message.subject}
</td>
</tr>

<tr>
<th>
Status
</th>
<td>
${message.status}
</td>
</tr>

</table>

</div>

<div class="col-md-6">

<table class="table table-bordered">

<tr>
<th>
IP Address
</th>
<td>
${message.ip_address || "-"}
</td>
</tr>

<tr>
<th>
Date
</th>
<td>
${formatDateTime(
    message.created_at
)}
</td>
</tr>

<tr>
<th>
Replied At
</th>
<td>
${
message.replied_at
?
formatDateTime(
    message.replied_at
)
:
"-"
}
</td>
</tr>

<tr>
<th>
Last Updated
</th>
<td>
${formatDateTime(
    message.updated_at
)}
</td>
</tr>

</table>

</div>

<div class="col-md-12">

<h6>
Message
</h6>

<div class="border rounded p-3">

${message.message}

</div>

</div>

<div class="col-md-12 mt-4">

<h6>
Admin Reply
</h6>

<small class="text-muted">

${
message.replied_at
?
`Last replied on ${formatDateTime(message.replied_at)}`
:
"Not replied yet"
}

</small>

<textarea
id="admin_reply"
class="form-control"
rows="4">${message.admin_reply || ""}</textarea>

</div>

<div class="col-md-6 mt-3">

<label>
Status
</label>

<select
id="message_status"
class="form-select">

<option
value="New"
${message.status === "New" ? "selected" : ""}>
New
</option>

<option
value="Read"
${message.status === "Read" ? "selected" : ""}>
Read
</option>

<option
value="Replied"
${message.status === "Replied" ? "selected" : ""}>
Replied
</option>

<option
value="Closed"
${message.status === "Closed" ? "selected" : ""}>
Closed
</option>

</select>

</div>

<div class="col-md-12 mt-3">

<button
class="btn btn-primary"
onclick="updateMessage(${message.id})">

Update Status

</button>

</div>

</div>

`;

        new bootstrap.Modal(
            document.getElementById(
                "viewContactMessageModal"
            )
        ).show();

    } catch (error) {

        console.error(error);

    }

}

async function updateMessage(id) {

    try {

        await updateMessageStatus(
            id,
            {

                status:
                document.getElementById(
                    "message_status"
                ).value,

                admin_reply:
                document.getElementById(
                    "admin_reply"
                ).value

            }
        );

        alert(
            "Message updated successfully"
        );

        bootstrap.Modal
        .getInstance(
            document.getElementById(
                "viewContactMessageModal"
            )
        )
        ?.hide();

        loadContactMessages();

    } catch (error) {

        console.error(error);

    }

}

async function removeContactMessage(id) {

    const confirmed =
    confirm(
        "Are you sure you want to delete this message?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteContactMessage(id);

        alert(
            "Message deleted successfully"
        );

        loadContactMessages();

    } catch (error) {

        console.error(error);

    }

}

function getStatusBadge(status) {

    switch (status) {

        case "New":

            return `
            <span class="bg-primary-focus text-primary-main px-24 py-4 rounded-pill fw-medium text-sm">
            New
            </span>
            `;

        case "Read":

            return `
            <span class="bg-info-focus text-info-main px-24 py-4 rounded-pill fw-medium text-sm">
            Read
            </span>
            `;

        case "Replied":

            return `
            <span class="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
            Replied
            </span>
            `;

        default:

            return `
            <span class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">
            Closed
            </span>
            `;

    }

}


