import express from "express";
import {
  getAllUsers,
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} from "../controllers/chatController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//for get all users
router.get("/users", auth, getAllUsers);

//for chat related routes
router.post("/", auth, accessChat);
router.get("/", auth, fetchChats);
router.post("/group", auth, createGroupChat);
router.put("/rename", auth, renameGroup);
router.put("/groupadd", auth, addToGroup);
router.put("/groupremove", auth, removeFromGroup);

export default router;
