import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getSinglePost,
} from "../controllers/postControllers.js";
import auth from "../middleware/auth.js";

//auth middleware is going to check if user is authorized or not

const router = express.Router();

router.get("/", getPosts);

router.get("/search", getPostsBySearch);

router.get("/:id", getSinglePost);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.patch("/:id/likePost", auth, likePost);

export default router;
