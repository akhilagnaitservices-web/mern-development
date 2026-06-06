import express from "express";

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
    "/",
    upload("gallery-videos")
    .single("thumbnail_image"),
    createGalleryVideo
);

router.put(
    "/:id",
    upload("gallery-videos")
    .single("thumbnail_image"),
    updateGalleryVideo
);

router.delete(
    "/:id",
    deleteGalleryVideo
);

export default router;