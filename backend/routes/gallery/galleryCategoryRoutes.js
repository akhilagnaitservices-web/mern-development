import express from "express";

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

router.post("/",createGalleryCategory
);

router.put("/:id",updateGalleryCategory
);

router.delete("/:id",deleteGalleryCategory
);

export default router;