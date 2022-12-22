import axios from "axios";

const url = "http://localhost:8000/posts";

export const fetchPosts = async () => {
  const fullArray = await axios.get(url);
  return fullArray.data;
};

export const createPost = async (newpost) => {
  const singleData = await axios.post(url, newpost);
  return singleData.data;
};

export const updatePost = async (id, updatedPost) => {
  // console.log("Updateding", updatedPost);
  const updatedData = await axios.patch(`${url}/${id}`, updatedPost);
  return updatedData;
};

export const deletePost = async (id) => {
  // console.log("Deleting", id);
  const deleteId = await axios.delete(`${url}/${id}`);
  return deleteId;
};

export const likePost = (id) => {
  console.log("Liking Id", id);
  axios.patch(`${url}/${id}/likePost`);
};

// export const createPost = async (newpost) => {
//   console.log("Add New Post", newpost);
//   fetch(url, {
//     method: "POST",
//     body: JSON.stringify(newpost),
//   });
// };
