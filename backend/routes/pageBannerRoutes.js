import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../middlewares/authJwt.js";

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
router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),upload("page-banners").single("banner_image"),createPageBanner);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),upload("page-banners").single("banner_image"),updatePageBanner);

router.patch("/:id/status", verifyToken, authorizeRoles("admin", "super_admin"),updatePageBannerStatus);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"),deletePageBanner);

export default router;