import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUser,
  getUserById,
  updateUserById,
} from "../controller/userController.js";
import {authenticateToken} from "../middleware/verifyToken.js";
import{createUserRoll} from "../controller/userRollController.js"

const router = express.Router();

// User APIs
router.post("/user", authenticateToken, createUser);
router.get("/user", authenticateToken, getAllUser);
router.get("/user/:id", authenticateToken, getUserById);
router.put("/user/:id", authenticateToken, updateUserById);
router.delete("/user/:id", authenticateToken, deleteUserById);

// Role APIs (fixed naming)
router.post("/roles", authenticateToken, createUserRoll);

export default router;
