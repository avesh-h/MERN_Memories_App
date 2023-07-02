import express from "express";
import auth from "../middleware/auth.js";
import { sendMessage, allMessages } from "../controllers/messageController.js";

const router = express.Router();

//we need two routes
// 1)for sending the message to the single user
//2)for get all the previous chat with that user

router.post("/", auth, sendMessage);
router.route("/:chatId").get(auth, allMessages);

export default router;
