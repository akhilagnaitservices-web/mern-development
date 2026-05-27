// ─── Helpers (must be at top before all form handlers) ───────────────────────

function showAlert(el, message, type) {
    if (!el) return;
    el.className = 'alert alert-' + type;
    el.textContent = message;
}

function setLoading(btn, spinner, loading) {
    if (!btn) return;
    btn.disabled = loading;
    if (spinner) spinner.classList.toggle('d-none', !loading);
}

// ─── Sign In ──────────────────────────────────────────────────────────────────

var signinForm = document.getElementById('signinForm');
if (signinForm) {
    signinForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value;
        var errorEl  = document.getElementById('signinError');
        var btn      = document.getElementById('signinBtn');
        var spinner  = document.getElementById('signinSpinner');

        errorEl.classList.add('d-none');
        setLoading(btn, spinner, true);

        fetch('/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                window.location.href = data.redirect || '/index.html';
            } else {
                showAlert(errorEl, data.message, 'danger');
                errorEl.classList.remove('d-none');
                setLoading(btn, spinner, false);
            }
        })
        .catch(function () {
            showAlert(errorEl, 'Something went wrong. Please try again.', 'danger');
            errorEl.classList.remove('d-none');
            setLoading(btn, spinner, false);
        });
    });
}

// ─── Logout ───────────────────────────────────────────────────────────────────

var logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        fetch('/auth/logout', { method: 'POST' })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            window.location.href = data.redirect || '/auth-logout.html';
        })
        .catch(function () {
            window.location.href = '/auth-logout.html';
        });
    });
}

// ─── Forgot Password ──────────────────────────────────────────────────────────

var forgotForm = document.getElementById('forgotPasswordForm');
if (forgotForm) {
    forgotForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var email     = document.getElementById('email').value.trim();
        var errorEl   = document.getElementById('forgotError');
        var successEl = document.getElementById('forgotSuccess');
        var btn       = document.getElementById('forgotBtn');
        var spinner   = document.getElementById('forgotSpinner');

        errorEl.classList.add('d-none');
        successEl.classList.add('d-none');
        setLoading(btn, spinner, true);

        fetch('/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                showAlert(successEl, data.message, 'success');
                successEl.classList.remove('d-none');
                forgotForm.reset();
            } else {
                showAlert(errorEl, data.message, 'danger');
                errorEl.classList.remove('d-none');
            }
            setLoading(btn, spinner, false);
        })
        .catch(function () {
            showAlert(errorEl, 'Something went wrong. Please try again.', 'danger');
            errorEl.classList.remove('d-none');
            setLoading(btn, spinner, false);
        });
    });
}

// ─── Reset Password ───────────────────────────────────────────────────────────

var resetForm = document.getElementById('resetPasswordForm');
if (resetForm) {
    var urlParams  = new URLSearchParams(window.location.search);
    var resetToken = urlParams.get('token');
    var errorParam = urlParams.get('error');
    var errorEl    = document.getElementById('resetError');
    var successEl  = document.getElementById('resetSuccess');

    if (errorParam === 'expired') {
        showAlert(errorEl, 'Your reset link has expired. Please request a new one.', 'danger');
        errorEl.classList.remove('d-none');
    }

    if (!resetToken) {
        showAlert(errorEl, 'Invalid or missing reset token. Please request a new link.', 'danger');
        errorEl.classList.remove('d-none');
        resetForm.style.display = 'none';
    }

    resetForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var newPassword     = document.getElementById('new_password').value;
        var confirmPassword = document.getElementById('confirm_password').value;
        var btn             = document.getElementById('resetBtn');
        var spinner         = document.getElementById('resetSpinner');

        errorEl.classList.add('d-none');
        successEl.classList.add('d-none');

        if (newPassword !== confirmPassword) {
            showAlert(errorEl, 'Passwords do not match.', 'danger');
            errorEl.classList.remove('d-none');
            return;
        }

        setLoading(btn, spinner, true);

        fetch('/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: resetToken, new_password: newPassword, confirm_password: confirmPassword })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                showAlert(successEl, data.message + ' Redirecting to login...', 'success');
                successEl.classList.remove('d-none');
                resetForm.reset();
                setTimeout(function () {
                    window.location.href = data.redirect || '/auth-login.html';
                }, 2000);
            } else {
                showAlert(errorEl, data.message, 'danger');
                errorEl.classList.remove('d-none');
                setLoading(btn, spinner, false);
            }
        })
        .catch(function () {
            showAlert(errorEl, 'Something went wrong. Please try again.', 'danger');
            errorEl.classList.remove('d-none');
            setLoading(btn, spinner, false);
        });
    });
}

// ─── Register ─────────────────────────────────────────────────────────────────

var registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var full_name        = document.getElementById('full_name').value.trim();
        var username         = document.getElementById('username').value.trim();
        var email            = document.getElementById('email').value.trim();
        var phone_number     = document.getElementById('phone_number').value.trim();
        var password         = document.getElementById('password').value;
        var confirm_password = document.getElementById('confirm_password').value;
        var terms            = document.getElementById('terms').checked;
        var errorEl          = document.getElementById('registerError');
        var successEl        = document.getElementById('registerSuccess');
        var btn              = document.getElementById('registerBtn');
        var spinner          = document.getElementById('registerSpinner');

        errorEl.classList.add('d-none');
        successEl.classList.add('d-none');

        if (!terms) {
            showAlert(errorEl, 'You must agree to the Terms and Conditions.', 'danger');
            errorEl.classList.remove('d-none');
            return;
        }

        setLoading(btn, spinner, true);

        fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ full_name: full_name, username: username, email: email, phone_number: phone_number, password: password, confirm_password: confirm_password })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                showAlert(successEl, data.message + ' Redirecting to login...', 'success');
                successEl.classList.remove('d-none');
                registerForm.reset();
                setTimeout(function () {
                    window.location.href = data.redirect || '/auth-login.html';
                }, 2000);
            } else {
                showAlert(errorEl, data.message, 'danger');
                errorEl.classList.remove('d-none');
                setLoading(btn, spinner, false);
            }
        })
        .catch(function () {
            showAlert(errorEl, 'Something went wrong. Please try again.', 'danger');
            errorEl.classList.remove('d-none');
            setLoading(btn, spinner, false);
        });
    });
}