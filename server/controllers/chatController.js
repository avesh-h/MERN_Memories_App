import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import Chat from "../models/chatModel.js";

//For get all users and we get searched user as well from this api
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
  const users = await User.find(keyword).find({ id: { $ne: req.userId } });
  res.send(users);
});

//For all Chat related controller
export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log("req body", userId);
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

  console.log("isChat", isChat);
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

//Fetch all chat that Perticular User (for that we have to do just see which user is currently login and query for all chat)
export const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.userId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//Create group functionality
export const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .send({ message: "Please fill all the required fields" });
  }
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form the group chat");
  }
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//Rename group functionality
export const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404);
      throw new Error("chat not found!");
    } else {
      res.json(updatedChat);
    }
  } catch (error) {}
});

//add some user inside the created group
export const addToGroup = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found!");
  } else {
    res.json(added);
  }
});

//remove someone from the group
export const removeFromGroup = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;

  const remove = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!remove) {
    res.status(404);
    throw new Error("Chat Not Found!");
  } else {
    res.json(remove);
  }
});
