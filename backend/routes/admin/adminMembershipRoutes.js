import express from "express";

import {
  getMembers,
  updateMember,
  updateMemberStatus,
  deleteMember
} from "../../controllers/admin/adminMembershipController.js";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin", "super_admin"),
  getMembers
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "super_admin"),
  updateMember
);

router.put(
  "/:id/status",
  verifyToken,
  authorizeRoles("admin", "super_admin"),
  updateMemberStatus
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "super_admin"),
  deleteMember
);

export default router;
