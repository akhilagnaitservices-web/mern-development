import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import upload from "../../middlewares/uploadMiddleware.js";

import {
    getEvents,
    getEventById,
     getEventBySlug,
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

router.get("/slug/:slug", getEventBySlug);

router.post(
    "/", verifyToken, authorizeRoles("admin", "super_admin"),
    upload("events").single("event_image"),
    createEvent
);

router.put(
    "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
    upload("events").single("event_image"),
    updateEvent
);

router.delete(
    "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
    deleteEvent
);

export default router;