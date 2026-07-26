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

    } catch (error) {

        console.error(error);

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

    }
);
