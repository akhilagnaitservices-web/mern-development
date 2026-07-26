import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

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

router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),createCoreValue
);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),updateCoreValue
);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteCoreValue
);

export default router;