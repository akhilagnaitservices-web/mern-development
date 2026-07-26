import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
  getPresidentMessage,
  getPresidentMessageById,
  createPresidentMessage,
  updatePresidentMessage,
  deletePresidentMessage
} from "../../controllers/home/presidentMessageController.js";

import upload from "../../middlewares/uploadMiddleware.js";

const router = express.Router();


// PUBLIC API
router.get("/", getPresidentMessage);


// ADMIN APIs
router.get("/:id", getPresidentMessageById);

router.post(
  "/", verifyToken, authorizeRoles("admin", "super_admin"),
  upload("president-message").single("president_photo"),
  createPresidentMessage
);

router.put(
  "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
  upload("president-message").single("president_photo"),
  updatePresidentMessage
);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"), deletePresidentMessage);

export default router;