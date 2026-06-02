import express from "express";

import {
  getAboutSamiti,
  getAboutSamitiById,
  createAboutSamiti,
  updateAboutSamiti,
  deleteAboutSamiti
} from "../../controllers/home/aboutSamitiController.js";

import upload from "../../middlewares/uploadMiddleware.js";

const router = express.Router();


// PUBLIC API
router.get("/", getAboutSamiti);


// ADMIN APIs
router.get("/:id", getAboutSamitiById);

router.post("/",upload("about-samiti").single("about_image"),createAboutSamiti
);

router.put("/:id",upload("about-samiti").single("about_image"),updateAboutSamiti);

router.delete("/:id", deleteAboutSamiti);

export default router;