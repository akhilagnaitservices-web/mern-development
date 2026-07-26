import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import upload from "../../middlewares/uploadMiddleware.js";

import {
  getLeadershipMembers,
  getLeadershipMemberById,
  createLeadershipMember,
  updateLeadershipMember,
  deleteLeadershipMember
} from "../../controllers/aboutus/leadershipMemberController.js";

const router = express.Router();

router.get( "/", getLeadershipMembers);

router.get("/:id",getLeadershipMemberById);

router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),upload("leadership-members").single("profile_image"),createLeadershipMember);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),upload("leadership-members").single("profile_image"),updateLeadershipMember);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteLeadershipMember);

export default router;