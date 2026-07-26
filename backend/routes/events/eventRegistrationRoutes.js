import express from "express";

import {
  verifyToken,
  authorizeRoles
} from "../../middlewares/authJwt.js";

import {
    getEventRegistrations,
    getEventRegistrationById,
    createEventRegistration,
    deleteEventRegistration
} from "../../controllers/events/eventRegistrationController.js";

const router = express.Router();

router.get("/",getEventRegistrations);

router.get("/:id",getEventRegistrationById);

router.post("/",createEventRegistration);

router.delete("/:id", verifyToken, authorizeRoles("admin", "super_admin"),deleteEventRegistration);

export default router;