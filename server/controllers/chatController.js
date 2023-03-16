import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import Chat from "../models/chatModel.js";

//For get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  //$or is like || for check the both condition like we apply onto the whole users database to find the user
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//For all Chat related controller
export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // console.log("req body", userId);
  if (!userId) {
    console.log("User Id param is not send with request");
    res.sendStatus(400);
  }
  var isChat = await Chat.find({
    //$and operator is like && operator that needs to be both condition true in this case we find the both user like user who loggedin and other user for finding previous chat is present or not
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.userId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    //If we found out we want populate the users info with latest message without password
    .populate("users", "-password")
    .populate("latestMessage");
  //We also want to populate the sender field(like who send the message) which is inside the messageModel
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });
  //If the chat exist it will return the chat
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    //else we are going to create a new chat of both user
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.userId, userId],
    };
    try {
      //First we create the chat
      const createdChat = await Chat.create(chatData);
      //Then we find the chat with createdChat id in the whole chat database and then send it to our user
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      res.send(400);
      throw new Error(error.message);
    }
  }
});
