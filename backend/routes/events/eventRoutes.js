import express from "express";

import upload from "../../middlewares/uploadMiddleware.js";

import {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from "../../controllers/events/eventController.js";

const router = express.Router();

router.get(
    "/",
    getEvents
);

router.get(
    "/:id",
    getEventById
);

router.post(
    "/",
    upload("events").single("event_image"),
    createEvent
);

router.put(
    "/:id",
    upload("events").single("event_image"),
    updateEvent
);

router.delete(
    "/:id",
    deleteEvent
);

export default router;