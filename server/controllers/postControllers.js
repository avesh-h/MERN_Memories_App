import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//Previous method for fatches the all posts from database
// export const getPosts = async (req, res) => {
//   try {
//     const postMessages = await PostMessage.find();
//     res.status(200).send(postMessages);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };

//New mehod for fatches the posts based on page number
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    //Maximum Numbers of the posts on single page
    const LIMIT = 8;

    //get index number of the first post on every page
    const startIndex = (Number(page) - 1) * LIMIT;

    //this total variable count the all the posts that we have based on that we could divided the posts into each page like example 8 posts are for first page and 64 posts are divided into 8 pages
    const total = await PostMessage.countDocuments({});

    //.limit method fetches the only number of the posts you want in this case is 8
    //.skip methos fetches the post of that only specific page number like example if we want to go in 3rd page we don't want to fetch the posts of the first two pages..
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).send({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

//Search post functionality of backend

//Query in Params both are very different things

//Query --> /posts?page=1  --> (page=1) is our query
//Params --> /posts/123 --> id= 123 it's our params

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    //convert query into regular expression

    // i is stands for ignore which means query ignore the case sensitive (test,Test,TEST --> test)
    const title = new RegExp(searchQuery, "i");

    //$or method is used for like find the one thing from the multiple things in this case is (title and tags)
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  // console.log("User create=========>", req.userId);
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
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
  //To check promise for task pending...
  // return new Promise((resolve, reject) => setTimeout(resolve("done"), 3000));

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
