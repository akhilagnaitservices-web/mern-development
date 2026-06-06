import express from "express";

import {
  getGothras,
  getGothraById,
  createGothra,
  updateGothra,
  deleteGothra
} from "../../controllers/gothras/gothraController.js";

const router = express.Router();

router.get("/", getGothras);

router.get("/:id", getGothraById);

router.post("/", createGothra);

router.put("/:id", updateGothra);

router.delete("/:id", deleteGothra);

export default router;