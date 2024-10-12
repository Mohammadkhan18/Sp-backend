import express from "express";
const router = express.Router();
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  loginUser,
} from "../controllers/user.controller.js";

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/:id", getUserById);

router.get("/", getAllUsers);

router.put("/:id", updateUserById);

router.delete("/:id", deleteUserById);

export default router;
