import express from "express";

import {
  getGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery
} from "../../controllers/home/galleryController.js";

import upload from "../../middlewares/uploadMiddleware.js";

const router = express.Router();


// PUBLIC APIs
router.get("/", getGallery);

router.get("/:id", getGalleryById);


// ADMIN APIs
router.post(
  "/",
  upload("gallery").single("gallery_image"),
  createGallery
);

router.put(
  "/:id",
  upload("gallery").single("gallery_image"),
  updateGallery
);

router.delete("/:id", deleteGallery);

export default router;