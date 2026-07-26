import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

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
  "/", verifyToken, authorizeRoles("admin", "super_admin"),
  upload("services").single("service_icon"),
  createQuickService
);

router.put(
  "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
  upload("services").single("service_icon"),
  updateQuickService
);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"), deleteQuickService);

export default router;