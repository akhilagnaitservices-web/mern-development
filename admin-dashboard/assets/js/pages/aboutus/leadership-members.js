let leadershipMemberId = null;
let leadershipMemberTable;

document.addEventListener(
"DOMContentLoaded",
async () => {


    await loadLeadershipMembers();

    leadershipMemberTable =
    new DataTable(
        "#dataTable"
    );

    document
    .getElementById(
        "leadershipMemberForm"
    )
    ?.addEventListener(
        "submit",
        saveLeadershipMember
    );

}


);

// LOAD MEMBERS
async function loadLeadershipMembers() {


try {

    const response =
    await getLeadershipMembers();

    const members =
    response.data.data;

    let html = "";

    members.forEach(
        (
            member,
            index
        ) => {

            html += `
                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>

                        ${
                            member.profile_image
                            ?
                            `
                            <img
                                src="${member.profile_image}"
                                width="80"
                                class="rounded">
                            `
                            :
                            "-"
                        }

                    </td>

                    <td>
                        ${member.full_name}
                    </td>

                    <td>
                        ${member.designation}
                    </td>

                    <td>
                        ${member.mobile_number || "-"}
                    </td>

                    <td>

                        ${
                            member.status === "active"

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
onclick="viewLeadershipMember(${member.id})">

<i class="ri-eye-line"></i>

</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
onclick="editLeadershipMember(${member.id})">

<i class="ri-edit-line"></i>

</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
onclick="removeLeadershipMember(${member.id})">

<i class="ri-delete-bin-line"></i>

</a>

</div>

                    </td>

                </tr>
            `;

        }
    );

    document.getElementById(
        "leadershipMemberTableBody"
    ).innerHTML = html;

} catch (error) {

    console.error(error);

}


}

// SAVE
async function saveLeadershipMember(e) {


e.preventDefault();

try {

    const form =
    document.getElementById(
        "leadershipMemberForm"
    );

    const formData =
    new FormData(form);

    if (
        leadershipMemberId
    ) {

        await updateLeadershipMember(
            leadershipMemberId,
            formData
        );

        alert(
            "Member updated successfully"
        );

    } else {

        await createLeadershipMember(
            formData
        );

        alert(
            "Member created successfully"
        );

    }

    form.reset();

    leadershipMemberId = null;

    bootstrap.Modal
    .getInstance(
        document.getElementById(
            "leadershipMemberModal"
        )
    )
    ?.hide();

    loadLeadershipMembers();

} catch (error) {

    console.error(error);

    alert(
        error?.response?.data?.message ||
        "Something went wrong"
    );

}


}

// EDIT
async function editLeadershipMember(id) {


try {

    const response =
    await getLeadershipMemberById(id);

    const member =
    response.data.data;

    leadershipMemberId = id;

    document.getElementById(
        "full_name"
    ).value =
    member.full_name || "";

    document.getElementById(
        "designation"
    ).value =
    member.designation || "";

    document.getElementById(
        "mobile_number"
    ).value =
    member.mobile_number || "";

    document.getElementById(
        "email"
    ).value =
    member.email || "";

    document.getElementById(
        "display_order"
    ).value =
    member.display_order || 0;

    document.getElementById(
        "status"
    ).value =
    member.status || "active";

    document.querySelector(
        "#leadershipMemberModal .modal-title"
    ).textContent =
    "Update Member";

    new bootstrap.Modal(
        document.getElementById(
            "leadershipMemberModal"
        )
    ).show();

} catch (error) {

    console.error(error);

}


}

// DELETE
async function removeLeadershipMember(id) {


const confirmed =
confirm(
    "Are you sure you want to delete this member?"
);

if (!confirmed) return;

try {

    await deleteLeadershipMember(id);

    alert(
        "Member deleted successfully"
    );

    loadLeadershipMembers();

} catch (error) {

    console.error(error);

}


}

// VIEW
async function viewLeadershipMember(id) {

try {

    const response =
    await getLeadershipMemberById(id);

    const member =
    response.data.data;

    document.getElementById(
    "viewLeadershipMemberContent"
).innerHTML = `

<div class="row align-items-start">

    <div class="col-md-4 text-center">

        <img
            src="${member.profile_image}"
            class="img-fluid rounded shadow-sm"
            style="max-height:250px;">

    </div>

    <div class="col-md-8">

        <h4 class="mb-3">
            ${member.full_name}
        </h4>

        <table class="table table-bordered">

            <tr>
                <th width="35%">
                    Designation
                </th>
                <td>
                    ${member.designation || "-"}
                </td>
            </tr>

            <tr>
                <th>
                    Mobile Number
                </th>
                <td>
                    ${member.mobile_number || "-"}
                </td>
            </tr>

            <tr>
                <th>
                    Email
                </th>
                <td>
                    ${member.email || "-"}
                </td>
            </tr>

            <tr>
                <th>
                    Display Order
                </th>
                <td>
                    ${member.display_order || 0}
                </td>
            </tr>

            <tr>
                <th>
                    Status
                </th>
                <td>
                    ${member.status}
                </td>
            </tr>

        </table>

    </div>

</div>

`;

    new bootstrap.Modal(
        document.getElementById(
            "viewLeadershipMemberModal"
        )
    ).show();

} catch (error) {

    console.error(error);

}


}
