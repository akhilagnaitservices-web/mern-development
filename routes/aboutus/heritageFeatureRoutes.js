import express from "express";

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
  "/",
  createHeritageFeature
);

router.put(
  "/:id",
  updateHeritageFeature
);



router.delete(
  "/:id",
  deleteHeritageFeature
);

export default router;