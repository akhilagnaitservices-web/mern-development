document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadAboutSamiti();

        document
        .getElementById(
            "aboutSamitiForm"
        )
        ?.addEventListener(
            "submit",
            saveAboutSamiti
        );

    }
);

let aboutId = null;

async function loadAboutSamiti() {

    try {

        const response =
        await getAboutSamiti();

        const about =
        response.data.data;

        aboutId =
        about.id;

        document.querySelector(
            '[name="about_title"]'
        ).value =
        about.about_title || "";

        document.querySelector(
            '[name="about_subtitle"]'
        ).value =
        about.about_subtitle || "";

        document.querySelector(
            '[name="vision"]'
        ).value =
        about.vision || "";

        document.querySelector(
            '[name="mission"]'
        ).value =
        about.mission || "";

        document.querySelector(
            '[name="objectives"]'
        ).value =
        about.objectives || "";

        document.querySelector(
            '[name="button_name"]'
        ).value =
        about.button_name || "";

        document.querySelector(
            '[name="button_link"]'
        ).value =
        about.button_link || "";

        document.querySelector(
            '[name="status"]'
        ).value =
        about.status || "active";

        if(about.about_image){

            document
            .getElementById(
                "aboutPreview"
            )
            .src =
            about.about_image;

        }

    }

    catch(error){

        console.log(error);

    }

}

async function saveAboutSamiti(e) {

    e.preventDefault();

    const form =
    document.getElementById(
        "aboutSamitiForm"
    );

    const formData =
    new FormData(form);

    try {

        if(aboutId){

            await updateAboutSamiti(
                aboutId,
                formData
            );

            alert(
                "About Samiti Updated Successfully"
            );

        }
        else{

            await createAboutSamiti(
                formData
            );

            alert(
                "About Samiti Created Successfully"
            );

        }

        loadAboutSamiti();

    }

    catch(error){

        console.log(error);

        alert(
            "Something went wrong"
        );

    }

}

async function deleteAboutSamitiRecord() {

    if(!aboutId)
        return;

    const confirmDelete =
    confirm(
        "Delete About Samiti?"
    );

    if(!confirmDelete)
        return;

    try {

        await deleteAboutSamiti(
            aboutId
        );

        alert(
            "Deleted Successfully"
        );

        document
        .getElementById(
            "aboutSamitiForm"
        )
        .reset();

        document
        .getElementById(
            "aboutPreview"
        )
        .src = "";

    }

    catch(error){

        console.log(error);

    }

}