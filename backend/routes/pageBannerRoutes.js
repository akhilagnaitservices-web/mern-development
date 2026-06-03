import express from "express";

import upload from "../middlewares/uploadMiddleware.js";

import {
  getPageBanners,
  getPageBannerById,
  getBannerByPageName,
  createPageBanner,
  updatePageBanner,
  deletePageBanner,
  updatePageBannerStatus
} from "../controllers/pageBannerController.js";

const router = express.Router();


// PUBLIC
router.get("/", getPageBanners);

router.get("/page/:pageName",getBannerByPageName);

router.get("/:id",getPageBannerById);


// ADMIN
router.post("/",upload("page-banners").single("banner_image"),createPageBanner);

router.put("/:id",upload("page-banners").single("banner_image"),updatePageBanner);

router.patch("/:id/status",updatePageBannerStatus);

router.delete("/:id",deletePageBanner);

export default router;