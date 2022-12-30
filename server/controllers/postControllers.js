import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  // const postMessages = await PostMessage.find();
  // PostMessage.find().then((response) => res.send(response));
  try {
    const postMessages = await PostMessage.find();
    res.status(200).send(postMessages);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  console.log("Backend", post);
  const newPost = new PostMessage(post);
  // newPost
  //   .save()
  //   .then(() => res.send("Added"))
  //   .catch((err) => console.log(err.message));
  try {
    const newData = await newPost.save();
    console.log("Try to create", newData);
    res.status(201).send(newData);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const updatedData = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  } else {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...updatedData, _id },
      {
        new: true, //New True will return th object
      }
    );
    res.send(updatedPost);
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post with that id");
  } else {
    await PostMessage.findByIdAndDelete(_id);
    res.send(_id);
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  //Now we can access middleware varible which store the id of user that currently logged in
  if (!req.userId) {
    return res.json({ message: "Unauthenticated!" });
  }

  //then we find the post for like
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post with that id");
  } else {
    const post = await PostMessage.findById(id);

    //now we have to check the user id is in the like section or not (each user can only like once and second time when he clicked it's going to be dislike the post)

    const likesIndex = post.likes.findIndex((id) => id === String(req.userId));

    if (likesIndex === -1) {
      //If the id is not found in likesIndex so for that we add -1
      //For liking the post (logic of like the post)
      post.likes.push(req.userId);
    } else {
      //FOr dislike the post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const likingPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.send(likingPost);
  }
};
