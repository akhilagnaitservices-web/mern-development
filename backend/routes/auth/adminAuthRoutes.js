import express from "express";

import {
  registerAdmin,
  loginAdmin
} from "../../controllers/auth/adminAuthController.js";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

const router = express.Router();

router.post(
  "/register",
  verifyToken,
  authorizeRoles("super_admin"),
  registerAdmin
);

router.post("/login", loginAdmin);

export default router;
