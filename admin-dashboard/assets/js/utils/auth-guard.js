(function () {

    const TOKEN_KEY = "token";
    const USER_KEY = "user";
    const LOGIN_PAGE = "sign-in.html";

    // Shared logout — clears session and returns to login
    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        window.location.replace(LOGIN_PAGE);
    }

    // Expose for any manual callers
    window.logout = logout;

    // 1) No token → block the page and redirect to login
    if (!localStorage.getItem(TOKEN_KEY)) {
        window.location.replace(LOGIN_PAGE);
        return;
    }

    // 2) Axios interceptors (axios is loaded before this script)
    if (window.axios) {

        // Attach the token to every request
        axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem(TOKEN_KEY);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Expired / invalid token → back to login
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error?.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

    }

    // 3) Wire the template's existing "Log Out" dropdown item
    document.addEventListener("DOMContentLoaded", () => {
        document
        .querySelectorAll("a, button")
        .forEach((el) => {
            if (el.textContent.trim().toLowerCase() === "log out") {
                el.addEventListener("click", (e) => {
                    e.preventDefault();
                    logout();
                });
            }
        });
    });

})();
