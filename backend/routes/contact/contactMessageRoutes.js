import express from "express";

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

router.put("/:id/status",updateContactMessageStatus
);

router.delete("/:id",deleteContactMessage
);

export default router;