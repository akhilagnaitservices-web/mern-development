import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
  getHeritageFeatures,
  getHeritageFeatureById,
  createHeritageFeature,
  updateHeritageFeature,
  deleteHeritageFeature
  
} from "../../controllers/aboutus/heritageFeatureController.js";

const router = express.Router();

router.get(
  "/",
  getHeritageFeatures
);

router.get(
  "/:id",
  getHeritageFeatureById
);

router.post(
  "/", verifyToken, authorizeRoles("admin", "super_admin"),
  createHeritageFeature
);

router.put(
  "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
  updateHeritageFeature
);



router.delete(
  "/:id", verifyToken, authorizeRoles("admin", "super_admin"),
  deleteHeritageFeature
);

export default router;