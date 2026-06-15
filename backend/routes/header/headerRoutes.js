import express from "express";

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
} from "../../controllers/header/headerControllers.js";

import upload from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

/* =====================================================
SITE HEADER
===================================================== */

router.get("/", getHeader);

router.post(
"/",
upload("header").any(),
createHeader
);

router.put(
"/:id",
upload("header").any(),
updateHeader
);

router.delete(
"/:id",
deleteHeader
);

/* =====================================================
SOCIAL MEDIA LINKS
===================================================== */

router.get(
"/social-media",
getSocialMediaLinks
);

router.post(
"/social-media",
upload("social-media").any(),
createSocialMediaLink
);

router.put(
"/social-media/:id",
upload("social-media").any(),
updateSocialMediaLink
);

router.delete(
"/social-media/:id",
deleteSocialMediaLink
);

/* =====================================================
FOOTER QUICK LINKS
===================================================== */

router.get(
"/footer-links",
getFooterQuickLinks
);

router.post(
"/footer-links",
createFooterQuickLink
);

router.put(
"/footer-links/:id",
updateFooterQuickLink
);

router.delete(
"/footer-links/:id",
deleteFooterQuickLink
);

export default router;
