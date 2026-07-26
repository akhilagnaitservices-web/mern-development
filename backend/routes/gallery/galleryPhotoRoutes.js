import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

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
    "/", verifyToken, authorizeRoles("admin", "super_admin"),
    upload("gallery-photos")
    .single("photo_image"),
    createGalleryPhoto
);

router.put(
    "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
    upload("gallery-photos")
    .single("photo_image"),
    updateGalleryPhoto
);

router.delete(
    "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
    deleteGalleryPhoto
);

export default router;