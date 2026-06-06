import express from "express";

import upload from "../../middlewares/uploadMiddleware.js";

import {

    getGalleryPhotos,
    getGalleryPhotoById,
    createGalleryPhoto,
    updateGalleryPhoto,

    deleteGalleryPhoto

} from "../../controllers/gallery/galleryPhotoController.js";

const router =
express.Router();

router.get(
    "/",
    getGalleryPhotos
);

router.get(
    "/:id",
    getGalleryPhotoById
);

router.post(
    "/",
    upload("gallery-photos")
    .single("photo_image"),
    createGalleryPhoto
);

router.put(
    "/:id",
    upload("gallery-photos")
    .single("photo_image"),
    updateGalleryPhoto
);

router.delete(
    "/:id",
    deleteGalleryPhoto
);

export default router;