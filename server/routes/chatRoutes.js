import express from "express";
import { getAllUsers, accessChat } from "../controllers/chatController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//for get all users
router.get("/users", auth, getAllUsers);

//for chat related routes
router.post("/", auth, accessChat);
// router.get("/", auth, fetchChats);
// router.post("/group", auth, createGroupChat);
// router.put("/rename", auth, renameGroup);
// router.put("/groupremove", auth, removeFromGroup);
// router.put("/groupadd", auth, addToGroup);

export default router;
