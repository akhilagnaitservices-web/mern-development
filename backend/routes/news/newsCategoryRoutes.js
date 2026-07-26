import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
    createNewsCategory,
    getNewsCategories,
    getNewsCategoryById,
    updateNewsCategory,
    deleteNewsCategory
}
from "../../controllers/news/newsCategoryController.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),createNewsCategory
);

router.get("/",getNewsCategories
);

router.get("/:id",getNewsCategoryById
);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),updateNewsCategory
);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteNewsCategory
);

export default router;