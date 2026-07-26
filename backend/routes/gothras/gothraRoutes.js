import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
  getGothras,
  getGothraById,
  createGothra,
  updateGothra,
  deleteGothra
} from "../../controllers/gothras/gothraController.js";

const router = express.Router();

router.get("/", getGothras);

router.get("/:id", getGothraById);

router.post("/", verifyToken, authorizeRoles("admin", "super_admin"), createGothra);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"), updateGothra);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"), deleteGothra);

export default router;