import express from "express";

import {
  registerUser,
  loginUser,
  getMyProfile,
  updateMyProfile,
  changePassword
} from "../../controllers/auth/userAuthController.js";

import {
  verifyToken
} from "../../middlewares/authJwt.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get(
  "/me",
  verifyToken,
  getMyProfile
);

router.put(
  "/me",
  verifyToken,
  updateMyProfile
);

router.put(
  "/change-password",
  verifyToken,
  changePassword
);

export default router;
