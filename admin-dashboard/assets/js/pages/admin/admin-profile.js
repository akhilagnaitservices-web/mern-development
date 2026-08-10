// Populates the header profile dropdown on every admin page, and the
// full "My Profile" card on view-profile.html, from the logged-in user.

function prettyRole(role) {
    if (!role) return "-";
    return role
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function setProfileText(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent =
        (value === null || value === undefined || value === "")
            ? "-"
            : value;
}

// Header dropdown (present on all protected pages) — from localStorage
function fillProfileHeader(user) {

    const boxes =
    document.querySelectorAll(
        ".dropdown-menu-sm .bg-primary-50"
    );

    boxes.forEach((box) => {

        const nameEl = box.querySelector("h6");
        const roleEl = box.querySelector("span");

        if (nameEl && user.full_name) {
            nameEl.textContent = user.full_name;
        }

        if (roleEl && user.role) {
            roleEl.textContent = prettyRole(user.role);
        }

    });

}

// Full profile card (view-profile.html only) — fetched fresh from the API
async function fillMyProfilePage(user) {

    try {

        const response =
        await getAdminUserById(user.id);

        const u = response.data.data;

        setProfileText("profileCardName", u.full_name);
        setProfileText("profileCardEmail", u.email);

        setProfileText("profileUserId", u.user_id);
        setProfileText("profileFullName", u.full_name);
        setProfileText("profileUsername", u.username);
        setProfileText("profileEmail", u.email);
        setProfileText("profilePhone", u.phone_number);
        setProfileText("profileRole", prettyRole(u.role));
        setProfileText("profileStatus", u.status);
        setProfileText("profileCreated", formatDateTime(u.created_at));
        setProfileText("profileLastLogin", formatDateTime(u.last_login));

        fillEditProfileForm(u);

    } catch (error) {

        console.error(error);

    }

}

// Edit Profile tab — prefill the form with the same data
function fillEditProfileForm(u) {

    const nameEl = document.getElementById("name");
    const usernameEl = document.getElementById("username");
    const emailEl = document.getElementById("email");
    const numberEl = document.getElementById("number");
    const roleEl = document.getElementById("role");
    const statusEl = document.getElementById("status");

    if (!nameEl) return;

    nameEl.value = u.full_name || "";
    usernameEl.value = u.username || "";
    emailEl.value = u.email || "";
    numberEl.value = u.phone_number || "";
    roleEl.value = u.role || "";
    statusEl.value = u.status || "";

}

// Edit Profile tab — save
async function saveEditProfile(userId) {

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const role = document.getElementById("role").value;
    const status = document.getElementById("status").value;

    if (!name || !username || !email || !role || !status) {
        alert("Full Name, Username, Email, Role and Status are required");
        return;
    }

    try {

        await updateAdminUser(userId, {
            full_name: name,
            username: username,
            email: email,
            phone_number: number,
            role: role,
            status: status
        });

        const storedUser =
        JSON.parse(localStorage.getItem("user") || "{}");

        storedUser.full_name = name;
        storedUser.role = role;

        localStorage.setItem(
            "user",
            JSON.stringify(storedUser)
        );

        alert("Profile updated successfully");

        fillProfileHeader(storedUser);
        fillMyProfilePage(storedUser);

    } catch (error) {

        console.error(error);
        alert(
            error?.response?.data?.message ||
            "Failed to update profile"
        );

    }

}

// Change Password tab — save
async function saveChangePassword() {

    const currentPassword =
    document.getElementById("current-password").value;

    const newPassword =
    document.getElementById("your-password").value;

    const confirmPassword =
    document.getElementById("confirm-password").value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert("All password fields are required");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("New Password and Confirmed Password do not match");
        return;
    }

    try {

        await changeAdminPassword({
            current_password: currentPassword,
            new_password: newPassword
        });

        alert("Password changed successfully");

        document.getElementById("current-password").value = "";
        document.getElementById("your-password").value = "";
        document.getElementById("confirm-password").value = "";

    } catch (error) {

        console.error(error);
        alert(
            error?.response?.data?.message ||
            "Failed to change password"
        );

    }

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const user =
        JSON.parse(
            localStorage.getItem("user") || "{}"
        );

        fillProfileHeader(user);

        // Only run the API fetch on the profile page
        if (
            document.getElementById("profileFullName") &&
            user.id
        ) {
            fillMyProfilePage(user);
        }

        const saveProfileBtn =
        document.getElementById("editProfileSaveBtn");

        saveProfileBtn?.addEventListener(
            "click",
            () => saveEditProfile(user.id)
        );

        const cancelProfileBtn =
        document.getElementById("editProfileCancelBtn");

        cancelProfileBtn?.addEventListener(
            "click",
            () => fillMyProfilePage(user)
        );

        const savePasswordBtn =
        document.getElementById("changePasswordSaveBtn");

        savePasswordBtn?.addEventListener(
            "click",
            saveChangePassword
        );

    }
);
