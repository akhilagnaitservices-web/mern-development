import express from "express";

import {
  getCoreValues,
  getCoreValueById,
  createCoreValue,
  updateCoreValue,
  deleteCoreValue
} from "../../controllers/aboutus/coreValueController.js";

const router = express.Router();

router.get("/",getCoreValues
);

router.get("/:id",getCoreValueById
);

router.post("/",createCoreValue
);

router.put("/:id",updateCoreValue
);

router.delete("/:id",deleteCoreValue
);

export default router;