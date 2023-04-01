import express from "express";
import {
  createUser,
  getAllUsers,
  logoutUser,
  getMyProfile,
  loginUser,
  // updateUser,
  // deleteUser,
} from "../controllers/user.js";
import { User } from "../models/user.js";
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

router.post("/new", createUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/all", getAllUsers);
router
  .get("/me", isAuthenticated, getMyProfile)
  // .put(updateUser)
  // .delete(deleteUser);

export default router; // exporting the router so that we can use it in app.js
