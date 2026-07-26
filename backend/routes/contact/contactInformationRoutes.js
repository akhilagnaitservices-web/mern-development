import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
    getContactInformation,
    createContactInformation,
    getContactInformationById,
    updateContactInformation
}
from "../../controllers/contact/contactInformationController.js";

const router =express.Router();

router.get("/",getContactInformation);
router.get("/:id",getContactInformationById);

router.post("/", verifyToken, authorizeRoles("admin", "super_admin"),createContactInformation);

router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"),updateContactInformation);

export default router;