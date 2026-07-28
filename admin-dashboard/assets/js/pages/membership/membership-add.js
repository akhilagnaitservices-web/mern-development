const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get("id");



document.addEventListener(
    "DOMContentLoaded",
    async () => {

        if (editId) {

            await prefillForEdit();

        }

        document
        .getElementById("memberAddForm")
        ?.addEventListener("submit", handleSubmitMember);

    }
);



async function prefillForEdit() {

    try {

        const response = await getMembers();

        const member =
        response.data.data.find((m) => String(m.id) === editId);

        if (!member) return;

        const form = document.getElementById("memberAddForm");

        [
            "full_name", "father_husband_name", "gothram", "surname",
            "gender", "date_of_birth", "mobile_number", "email",
            "address", "city", "state", "pincode"
        ].forEach((field) => {

            const input = form.elements[field];
            if (input && member[field] !== null) input.value = member[field];

        });

        // Password is not editable here; photo field is replaced with a preview
        form.elements["password"]
            ?.closest(".mb-20").classList.add("d-none");

        const photoField = form.elements["photo"]?.closest(".mb-20");

        if (photoField && member.photo) {
            photoField.innerHTML = `
                <label class="form-label fw-semibold text-primary-light text-sm mb-8">Current Photo</label>
                <div><img src="${member.photo}" alt="Photo" style="width:100px;height:100px;object-fit:cover;border-radius:8px;"></div>
            `;
        } else if (photoField) {
            photoField.classList.add("d-none");
        }

        document.querySelector("h6.fw-semibold").textContent = "Edit Member";
        document.querySelector("button[type=\"submit\"]").textContent = "Update";

    } catch (error) {

        console.error(error);

    }

}



async function handleSubmitMember(e) {

    e.preventDefault();

    const form = document.getElementById("memberAddForm");
    const errorBox = document.getElementById("memberAddError");
    errorBox.classList.add("d-none");

    try {

        let response;

        if (editId) {

            const data = Object.fromEntries(new FormData(form));
            delete data.password;
            delete data.photo;

            response = await updateMember(editId, data);

        } else {

            const formData = new FormData(form);
            response = await createMember(formData);

        }

        if (response.data?.success) {

            alert(editId ? "Member updated successfully" : "Member added successfully");
            window.location.href = "membership-list.html";

        } else {

            errorBox.textContent = response.data?.message || "Failed to save member";
            errorBox.classList.remove("d-none");

        }

    } catch (error) {

        errorBox.textContent =
            error?.response?.data?.message || "Failed to save member";
        errorBox.classList.remove("d-none");

    }

}
