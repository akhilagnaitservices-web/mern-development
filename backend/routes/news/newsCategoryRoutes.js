import express from "express";

import {
    createNewsCategory,
    getNewsCategories,
    getNewsCategoryById,
    updateNewsCategory,
    deleteNewsCategory
}
from "../../controllers/news/newsCategoryController.js";

const router = express.Router();

router.post("/",createNewsCategory
);

router.get("/",getNewsCategories
);

router.get("/:id",getNewsCategoryById
);

router.put("/:id",updateNewsCategory
);

router.delete("/:id",deleteNewsCategory
);

export default router;