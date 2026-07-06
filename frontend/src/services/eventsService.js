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

export const getMainEventBySlug = (slug) =>
    API.get(`/mainevents/slug/${slug}`);

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

export const getEventBySlug = (slug) =>
    API.get(`/mainevents/slug/${slug}`);

export const getEventById = (id) =>
    API.get(`/mainevents/${id}`);

export const getEventDetails = async (identifier) => {

    try {

        let eventResponse;

        try {

            eventResponse = await getEventBySlug(identifier);

        } catch (error) {

            if (error.response?.status === 404) {

                eventResponse = await getEventById(identifier);

            } else {

                throw error;

            }

        }

        const event = eventResponse?.data?.data;

        if (!event?.event_id) {

            return {

                success: false,

                event: null,

                gallery: []

            };

        }

        const galleryResponse = await getEventGallery(event.event_id);

        return {

            success: true,

            event: {
                ...event,
                slug: event.event_slug || identifier
            },

            gallery:
                galleryResponse?.data?.data || []

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