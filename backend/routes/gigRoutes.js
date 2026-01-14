import express from "express";
import { getGigs, createGig } from "../controllers/gigController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/",protect, getGigs);
router.post("/", protect, createGig);

export default router;
