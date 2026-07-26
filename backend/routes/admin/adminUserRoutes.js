import express from "express";

import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../../controllers/admin/adminUserController.js";

import {
    verifyToken,
    authorizeRoles
} from "../../middlewares/authJwt.js";

const router = express.Router();

router.get(
    "/",
    verifyToken,
    authorizeRoles("admin", "super_admin"),
    getUsers
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "super_admin"),
    getUserById
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "super_admin"),
    updateUser
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "super_admin"),
    deleteUser
);

export default router;
