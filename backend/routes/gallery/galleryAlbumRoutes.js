import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import upload from "../../middlewares/uploadMiddleware.js";

import {

    getGalleryAlbums,
    getGalleryAlbumById,

    createGalleryAlbum,
    updateGalleryAlbum,

    deleteGalleryAlbum

} from "../../controllers/gallery/galleryAlbumController.js";

const router =
express.Router();

router.get(
    "/",
    getGalleryAlbums
);

router.get(
    "/:id",
    getGalleryAlbumById
);

router.post(
    "/", verifyToken, authorizeRoles("admin", "super_admin"),
    upload("gallery-albums")
    .single("album_cover_image"),
    createGalleryAlbum
);

router.put(
    "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
    upload("gallery-albums")
    .single("album_cover_image"),
    updateGalleryAlbum
);

router.delete(
    "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
    deleteGalleryAlbum
);

export default router;