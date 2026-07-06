import express from "express";

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

router.post("/",upload("news").single("featured_image"),createNews);

router.put("/:id",upload("news").single("featured_image"),updateNews);

router.delete("/:id",deleteNews);

export default router;