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
    res.json(updatedPost);
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post with that id");
  } else {
    const deletedPost = await PostMessage.findByIdAndDelete(_id);
    res.send("Sucessfully Deleted");
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post with that id");
  } else {
    const post = await PostMessage.findById(id);
    const likingPost = await PostMessage.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );
    res.json(likingPost);
  }
};
