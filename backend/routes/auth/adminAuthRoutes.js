import express from "express";

import {
  registerAdmin,
  loginAdmin,
  changeAdminPassword
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

router.put(
  "/change-password",
  verifyToken,
  changeAdminPassword
);

export default router;
