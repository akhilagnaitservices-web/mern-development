import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {

    createContactMessage,
    getContactMessages,
    getContactMessageById,
    updateContactMessageStatus,
    deleteContactMessage

}
from "../../controllers/contact/contactMessageController.js";

const router =
express.Router();

router.post("/",createContactMessage
);

router.get("/",getContactMessages
);

router.get("/:id",getContactMessageById);

router.put("/:id/status", verifyToken, authorizeRoles("admin", "super_admin"),updateContactMessageStatus
);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteContactMessage
);

export default router;