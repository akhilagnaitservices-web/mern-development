import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import upload from "../../middlewares/uploadMiddleware.js";

import {

    getGalleryVideos,
    getGalleryVideoById,
    createGalleryVideo,
    updateGalleryVideo,
    deleteGalleryVideo

} from "../../controllers/gallery/galleryVideoController.js";

const router =
express.Router();

router.get(
    "/",
    getGalleryVideos
);

router.get(
    "/:id",
    getGalleryVideoById
);

router.post(
    "/", verifyToken, authorizeRoles("admin", "super_admin"),
    upload("gallery-videos")
    .single("thumbnail_image"),
    createGalleryVideo
);

router.put(
    "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
    upload("gallery-videos")
    .single("thumbnail_image"),
    updateGalleryVideo
);

router.delete(
    "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
    deleteGalleryVideo
);

export default router;