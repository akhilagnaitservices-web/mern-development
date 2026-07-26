 import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
getHeader,
createHeader,
updateHeader,
deleteHeader,
getSocialMediaLinks,
createSocialMediaLink,
updateSocialMediaLink,
deleteSocialMediaLink,
getFooterQuickLinks,
createFooterQuickLink,
updateFooterQuickLink,
deleteFooterQuickLink,
} from "../../controllers/header/headerController.js";

import upload from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

/* =====================================================
SITE HEADER
===================================================== */

router.get("/", getHeader);

router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),upload("header").any(),createHeader);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),upload("header").any(),updateHeader);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteHeader);

/* =====================================================
SOCIAL MEDIA LINKS
===================================================== */

router.get("/social-media",getSocialMediaLinks);

router.post("/social-media", verifyToken, authorizeRoles("admin", "super_admin"),createSocialMediaLink);

router.put("/social-media/:id", verifyToken, authorizeRoles("admin", "super_admin"),updateSocialMediaLink);

router.delete("/social-media/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteSocialMediaLink);

/* =====================================================
FOOTER QUICK LINKS
===================================================== */

router.get("/footer-links",getFooterQuickLinks);

router.post("/footer-links", verifyToken, authorizeRoles("admin", "super_admin"),createFooterQuickLink);

router.put("/footer-links/:id", verifyToken, authorizeRoles("admin", "super_admin"),updateFooterQuickLink);

router.delete("/footer-links/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteFooterQuickLink);

export default router;