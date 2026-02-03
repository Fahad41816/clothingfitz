import express from "express";
import { AuthController } from "./auth.controller";
 

const router = express.Router();

// POST /api/users/register
router.post("/register", AuthController.RegisterUser);
router.post("/login", AuthController.LoginUser);
router.post("/forget-password", AuthController.forgetPassword)
router.post("/reset-password", AuthController.resetPassword)

export const authRouter = router

