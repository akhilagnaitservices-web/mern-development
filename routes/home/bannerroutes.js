import express from "express";

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
  "/",
  upload("banners").single("banner_image"),
  createBanner
);

router.put(
  "/:id",
  upload("banners").single("banner_image"),
  updateBanner
);

router.delete("/:id", deleteBanner);

export default router;