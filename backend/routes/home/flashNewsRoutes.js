import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
  getFlashNews,
  getFlashNewsBySlug,
  getFlashNewsById,
  createFlashNews,
  updateFlashNews,
  deleteFlashNews
} from "../../controllers/home/flashNewsController.js";

import upload from "../../middlewares/uploadMiddleware.js";

const router = express.Router();


// PUBLIC APIs
router.get("/", getFlashNews);

router.get("/slug/:slug", getFlashNewsBySlug);


// ADMIN APIs
router.get("/:id", getFlashNewsById);

router.post(
  "/", verifyToken, authorizeRoles("admin", "super_admin"),
  upload("flash-news").single("news_image"),
  createFlashNews
);

router.put(
  "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
  upload("flash-news").single("news_image"),
  updateFlashNews
);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"), deleteFlashNews);

export default router;