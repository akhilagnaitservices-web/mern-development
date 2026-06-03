import express from "express";

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
router.post("/",upload("events").single("event_image"),createEvent);

router.put("/:id",upload("events").single("event_image"),updateEvent);

router.delete("/:id", deleteEvent);

export default router;