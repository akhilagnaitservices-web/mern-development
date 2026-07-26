import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner
} from "../../controllers/home/bannerController.js";

import upload from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

// PUBLIC API
router.get("/", getBanners);


// ADMIN APIs
router.get("/:id", getBannerById);

router.post(
  "/", verifyToken, authorizeRoles("admin", "super_admin"),
  upload("banners").single("banner_image"),
  createBanner
);

router.put(
  "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
  upload("banners").single("banner_image"),
  updateBanner
);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"), deleteBanner);

export default router;