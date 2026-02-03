import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/All", userController.getUsers);
router.get("/single", userController.getUser);
router.patch("/", userController.updateUserByUser);
router.patch("/updateByAdmin", userController.updateUserByAdmin);

export const userRouter = router;
