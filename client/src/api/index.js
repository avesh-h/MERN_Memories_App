import axios from "axios";

const url = "http://localhost:8000/posts";

export const fetchPosts = async () => {
  const fullArray = await axios.get(url);
  return fullArray.data;
};

export const createPost = async (newpost) => {
  console.log("Add New Post", newpost);
  await axios.post(url, newpost);
};

export const updatePost = (id, updatedPost) => {
  console.log("Updateding", updatedPost);
  axios.patch(`${url}/${id}`, updatedPost);
};

export const deletePost = (id) => {
  console.log("Deleting", id);
  axios.delete(`${url}/${id}`);
};

// export const createPost = async (newpost) => {
//   console.log("Add New Post", newpost);
//   fetch(url, {
//     method: "POST",
//     body: JSON.stringify(newpost),
//   });
// };
