import express from "express";

import upload from "../../middlewares/uploadMiddleware.js";

import {

    getEventGallery,
    getEventGalleryById,

    createEventGallery,
    updateEventGallery,

    deleteEventGallery

} from "../../controllers/events/eventGalleryController.js";

const router = express.Router();

router.get("/",getEventGallery);

router.get("/:id",getEventGalleryById);

router.post("/",upload("event-gallery").single("image_path"),createEventGallery);

router.put("/:id",upload("event-gallery").single("image_path"),updateEventGallery);

router.delete("/:id",deleteEventGallery);

export default router;