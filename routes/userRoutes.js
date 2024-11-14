import express from "express";
import {
  GetAllusers,
  postusers,
  loginUsers,
  logoutUser,
} from "../controlla/userController.js";
const router = express.Router();

router.post("/register", postusers);
router.get("/", GetAllusers);
router.post("/login", loginUsers);
router.delete("/logout/:userId", logoutUser);

export default router;
