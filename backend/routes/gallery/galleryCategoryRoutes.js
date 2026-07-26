import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
    getGalleryCategories,
    getGalleryCategoryById,
    createGalleryCategory,
    updateGalleryCategory,
    deleteGalleryCategory

} from "../../controllers/gallery/galleryCategoryController.js";

const router = express.Router();

router.get("/",getGalleryCategories
);

router.get("/:id",getGalleryCategoryById
);

router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),createGalleryCategory
);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),updateGalleryCategory
);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteGalleryCategory
);

export default router;