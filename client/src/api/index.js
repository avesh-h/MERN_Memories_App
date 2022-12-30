import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

// const url = "http://localhost:8000/posts";

export const fetchPosts = async () => {
  const fullArray = await API.get("/posts");
  return fullArray.data;
};

export const createPost = async (newpost) => {
  const singleData = await API.post("/posts", newpost);
  return singleData.data;
};

export const updatePost = async (id, updatedPost) => {
  // console.log("Updateding", updatedPost);
  const updatedData = await API.patch(`/posts/${id}`, updatedPost);
  return updatedData;
};

export const deletePost = async (id) => {
  // console.log("Deleting", id);
  const deleteId = await API.delete(`/posts/${id}`);
  return deleteId;
};

export const likePost = (id) => {
  console.log("Liking Id", id);
  API.patch(`/posts/${id}/likePost`);
};

export const signIn = async (formData) => {
  const data = await API.post("/users/signin", formData);
  return data;
};

export const signUp = async (formData) => {
  const data = await API.post("/users/signup", formData);
  return data;
};

// export const createPost = async (newpost) => {
//   console.log("Add New Post", newpost);
//   fetch(url, {
//     method: "POST",
//     body: JSON.stringify(newpost),
//   });
// };
