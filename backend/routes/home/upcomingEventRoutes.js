import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "../../controllers/home/upcomingEventController.js";

import upload from "../../middlewares/uploadMiddleware.js";

const router = express.Router();


// PUBLIC APIs
router.get("/", getEvents);

router.get("/:id", getEventById);


// ADMIN APIs
router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),upload("events").single("event_image"),createEvent);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),upload("events").single("event_image"),updateEvent);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"), deleteEvent);

export default router;