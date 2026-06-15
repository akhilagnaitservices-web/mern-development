import API from "./api.js";

/* =========================
   HOME EVENTS
========================= */

export const getEvents = (params = {}) =>
    API.get("/events", { params });

/* =========================
   MAIN EVENTS
========================= */

export const getMainEvents = (params = {}) =>
    API.get("/mainevents", { params });

export const getMainEventById = (id) =>
    API.get(`/mainevents/${id}`);

/* =========================
   EVENT GALLERY
========================= */

export const getEventGallery = (eventId) =>
    API.get("/event-gallery", {
        params: {
            event_id: eventId
        }
    });

/* =========================
   EVENT REGISTRATION
========================= */

export const registerForEvent = (data) =>
    API.post("/event-registrations", data);

/* =========================
   EVENT DETAILS PAGE DATA
========================= */

export const getEventDetails = async (id) => {

    try {

        const [eventRes, galleryRes] =
            await Promise.all([

                getMainEventById(id),

                getEventGallery(id)

            ]);

        return {

            success: true,

            event:
                eventRes.data.data,

            gallery:
                galleryRes.data.data || []

        };

    } catch (error) {

        console.error(
            "Event Details Error",
            error
        );

        return {

            success: false,

            event: null,

            gallery: []

        };

    }

};