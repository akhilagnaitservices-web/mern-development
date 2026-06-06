import express from "express";

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
    "/",
    upload("gallery-albums")
    .single("album_cover_image"),
    createGalleryAlbum
);

router.put(
    "/:id",
    upload("gallery-albums")
    .single("album_cover_image"),
    updateGalleryAlbum
);

router.delete(
    "/:id",
    deleteGalleryAlbum
);

export default router;