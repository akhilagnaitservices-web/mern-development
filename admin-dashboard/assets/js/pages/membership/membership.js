document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadMembers();

    }
);



function showToast(message, success = true) {

    const toast = document.createElement("div");

    toast.className =
        `position-fixed top-0 end-0 m-24 px-24 py-16 radius-8 text-white fw-medium ${
            success ? "bg-success-main" : "bg-danger-main"
        }`;

    toast.style.zIndex = 9999;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);

}



function statusBadge(status) {

    if (status === "approved") {
        return `<span class="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">Approved</span>`;
    }

    if (status === "rejected") {
        return `<span class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">Rejected</span>`;
    }

    return `<span class="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm">Pending</span>`;

}



let cachedMembers = [];



async function loadMembers() {

    try {

        const response =
        await getMembers();

        const members =
        response.data.data;

        cachedMembers = members;

        let html = "";

        members.forEach(
            (member, index) => {

                html += `
                    <tr>

                        <td>
                            <div class="d-flex align-items-center gap-10">
                                <div class="form-check style-check d-flex align-items-center">
                                    <input class="form-check-input radius-4 border border-neutral-400" type="checkbox" name="checkbox">
                                </div>
                                ${index + 1}
                            </div>
                        </td>

                        <td>${member.member_id}</td>

                        <td>${member.full_name}</td>

                        <td>${member.mobile_number || "-"}</td>

                        <td>${member.email || "-"}</td>

                        <td>${member.gothram}</td>

                        <td class="text-center">
                            ${statusBadge(member.status)}
                        </td>

                        <td>

<div class="d-flex align-items-center gap-10 justify-content-center">

<a
class="w-32-px h-32-px bg-primary-light text-primary-600 rounded-circle d-flex justify-content-center align-items-center"
title="View"
onclick="viewMember(${member.id})">
<i class="ri-eye-line"></i>
</a>

<a
class="w-32-px h-32-px bg-info-focus text-info-main rounded-circle d-flex justify-content-center align-items-center"
title="Edit"
onclick="editMember(${member.id})">
<i class="ri-edit-line"></i>
</a>

<a
class="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center"
title="Approve"
onclick="approveMember(${member.id})">
<i class="ri-check-line"></i>
</a>

<a
class="w-32-px h-32-px bg-warning-focus text-warning-main rounded-circle d-flex justify-content-center align-items-center"
title="Reject"
onclick="rejectMember(${member.id})">
<i class="ri-close-line"></i>
</a>

<a
class="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center"
title="Delete"
onclick="removeMember(${member.id})">
<i class="ri-delete-bin-line"></i>
</a>

</div>

                        </td>

                    </tr>
                `;

            }
        );

        document.getElementById(
            "membershipTableBody"
        ).innerHTML = html || `<tr><td colspan="8" class="text-center py-24">No registrations found</td></tr>`;

    } catch (error) {

        console.error(error);

    }

}



function viewMember(id) {

    const member =
    cachedMembers.find((m) => m.id === id);

    if (!member) return;

    document.getElementById("viewMemberContent").innerHTML = `
        ${member.photo ? `<div class="text-center mb-16"><img src="${member.photo}" alt="Photo" style="width:120px;height:120px;object-fit:cover;border-radius:8px;"></div>` : ""}
        <table class="table">
            <tr><th>Member ID</th><td>${member.member_id}</td></tr>
            <tr><th>Full Name</th><td>${member.full_name}</td></tr>
            <tr><th>Father/Husband Name</th><td>${member.father_husband_name}</td></tr>
            <tr><th>Gothram</th><td>${member.gothram}</td></tr>
            <tr><th>Surname</th><td>${member.surname}</td></tr>
            <tr><th>Gender</th><td>${member.gender || "-"}</td></tr>
            <tr><th>Date of Birth</th><td>${member.date_of_birth || "-"}</td></tr>
            <tr><th>Mobile</th><td>${member.mobile_number || "-"}</td></tr>
            <tr><th>Email</th><td>${member.email || "-"}</td></tr>
            <tr><th>Address</th><td>${member.address || "-"}</td></tr>
            <tr><th>City</th><td>${member.city || "-"}</td></tr>
            <tr><th>State</th><td>${member.state || "-"}</td></tr>
            <tr><th>Pincode</th><td>${member.pincode || "-"}</td></tr>
            <tr><th>Status</th><td>${member.status}</td></tr>
        </table>
    `;

    new bootstrap.Modal(
        document.getElementById("viewMemberModal")
    ).show();

}



function editMember(id) {

    window.location.href = `membership-add.html?id=${id}`;

}



async function approveMember(id) {

    if (!confirm("Approve this member?")) return;

    try {
        await updateMemberStatus(id, "approved");
        showToast("Member approved successfully");
    } catch (error) {
        showToast("Failed to approve member", false);
    }

    loadMembers();

}



async function rejectMember(id) {

    if (!confirm("Reject this member?")) return;

    try {
        await updateMemberStatus(id, "rejected");
        showToast("Member rejected");
    } catch (error) {
        showToast("Failed to reject member", false);
    }

    loadMembers();

}



async function removeMember(id) {

    if (!confirm("Delete this member permanently?")) return;

    try {
        await deleteMember(id);
        showToast("Member deleted successfully");
    } catch (error) {
        showToast("Failed to delete member", false);
    }

    loadMembers();

}
