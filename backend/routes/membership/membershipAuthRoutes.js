import express from "express";

import {
  registerMembership,
  loginMembership,
  forgotMembershipPassword,
  resetMembershipPassword,
  changeMembershipPassword,
  getMyProfile,
  updateMyProfile
} from "../../controllers/membership/membershipAuthController.js";

import {
  verifyToken
} from "../../middlewares/authJwt.js";

import upload from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  upload("membership").single("photo"),
  registerMembership
);

router.post("/login", loginMembership);

router.post("/forgot-password", forgotMembershipPassword);

router.post("/reset-password", resetMembershipPassword);

router.put(
  "/change-password",
  verifyToken,
  changeMembershipPassword
);

router.get("/me", verifyToken, getMyProfile);

router.put("/me", verifyToken, updateMyProfile);

export default router;
