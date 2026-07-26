document.addEventListener(
    "DOMContentLoaded",
    () => {

        // If already logged in, go straight to the dashboard
        if (localStorage.getItem("token")) {
            window.location.replace("index.html");
            return;
        }

        document
        .getElementById("adminLoginForm")
        ?.addEventListener("submit", handleAdminLogin);

    }
);



async function handleAdminLogin(e) {

    e.preventDefault();

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("your-password").value;

    const submitBtn =
    document.getElementById("loginBtn");

    clearLoginError();

    if (!email || !password) {
        showLoginError("Please enter your email and password.");
        return;
    }

    try {

        if (submitBtn) submitBtn.disabled = true;

        const response =
        await adminLogin({ email, password });

        if (response.data?.success) {

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.data)
            );

            window.location.replace("index.html");

        } else {

            showLoginError(
                response.data?.message ||
                "Login failed. Please try again."
            );

        }

    } catch (error) {

        showLoginError(
            error?.response?.data?.message ||
            "Invalid credentials."
        );

    } finally {

        if (submitBtn) submitBtn.disabled = false;

    }

}



function showLoginError(message) {

    const box =
    document.getElementById("loginError");

    if (box) {
        box.textContent = message;
        box.classList.remove("d-none");
    }

}



function clearLoginError() {

    const box =
    document.getElementById("loginError");

    if (box) {
        box.textContent = "";
        box.classList.add("d-none");
    }

}
