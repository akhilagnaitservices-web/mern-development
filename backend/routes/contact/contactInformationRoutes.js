import express from "express";

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

router.post("/",createContactInformation);

router.put("/:id",updateContactInformation);

export default router;