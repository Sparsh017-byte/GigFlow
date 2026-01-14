import express from "express";
import { login, register, logout,getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);   
router.post("/logout", logout);

export default router;
