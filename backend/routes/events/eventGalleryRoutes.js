import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

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

router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),upload("event-gallery").single("image_path"),createEventGallery);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),upload("event-gallery").single("image_path"),updateEventGallery);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteEventGallery);

export default router;