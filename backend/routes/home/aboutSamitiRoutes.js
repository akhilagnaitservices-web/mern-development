import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

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

router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),upload("about-samiti").single("about_image"),createAboutSamiti
);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),upload("about-samiti").single("about_image"),updateAboutSamiti);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"), deleteAboutSamiti);

export default router;