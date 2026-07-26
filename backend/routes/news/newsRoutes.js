import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import upload
from "../../middlewares/uploadMiddleware.js";

import {
    getNews,
    getNewsById,
    getNewsBySlug,
    createNews,
    updateNews,
    deleteNews,
    getPopularNews
}
from "../../controllers/news/newsController.js";

const router =
express.Router();

router.get("/",getNews);

router.get("/popular",getPopularNews);

router.get("/slug/:slug", getNewsBySlug);

router.get("/:id",getNewsById);

router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),upload("news").single("featured_image"),createNews);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),upload("news").single("featured_image"),updateNews);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteNews);

export default router;