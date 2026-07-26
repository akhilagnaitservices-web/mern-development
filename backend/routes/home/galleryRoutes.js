import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

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
  "/", verifyToken, authorizeRoles("admin", "super_admin"),
  upload("gallery").single("gallery_image"),
  createGallery
);

router.put(
  "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
  upload("gallery").single("gallery_image"),
  updateGallery
);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"), deleteGallery);

export default router;