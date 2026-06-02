import express from "express";

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
  "/",
  upload("flash-news").single("news_image"),
  createFlashNews
);

router.put(
  "/:id",
  upload("flash-news").single("news_image"),
  updateFlashNews
);

router.delete("/:id", deleteFlashNews);

export default router;