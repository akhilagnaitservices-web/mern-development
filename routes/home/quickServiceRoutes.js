import express from "express";

import {
  getQuickServices,
  getQuickServiceById,
  createQuickService,
  updateQuickService,
  deleteQuickService
} from "../../controllers/home/quickServiceController.js";

import upload from "../../middlewares/uploadMiddleware.js";

const router = express.Router();


// PUBLIC API
router.get("/", getQuickServices);


// ADMIN APIs
router.get("/:id", getQuickServiceById);

router.post(
  "/",
  upload("services").single("service_icon"),
  createQuickService
);

router.put(
  "/:id",
  upload("services").single("service_icon"),
  updateQuickService
);

router.delete("/:id", deleteQuickService);

export default router;