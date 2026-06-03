import express from "express";

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
  "/",
  upload("president-message").single("president_photo"),
  createPresidentMessage
);

router.put(
  "/:id",
  upload("president-message").single("president_photo"),
  updatePresidentMessage
);

router.delete("/:id", deletePresidentMessage);

export default router;