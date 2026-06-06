import express from "express";

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

router.post("/",upload("leadership-members").single("profile_image"),createLeadershipMember);

router.put("/:id",upload("leadership-members").single("profile_image"),updateLeadershipMember);

router.delete("/:id",deleteLeadershipMember);

export default router;