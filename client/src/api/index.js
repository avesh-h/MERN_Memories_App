import axios from "axios";

//for Live project
// const API = axios.create({
//   baseURL: process.env.REACT_APP_MY_LIVE_URL,
// });

//For local
const API = axios.create({
  baseURL: process.env.REACT_APP_MY_LOCAL_URL,
});

//to check the token of user is present in localstorage or not and this interceptors callback is going to excuted before sending the request to the backend and set token to the request header so in backend middleware function can check the user is authorized or not

//set token in headers for authorization
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).tokenId ||
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

//Previous method in which we fetches the all the posts
// export const fetchPosts = async (page) => {
//   const fullArray = await API.get("/posts");
//   return fullArray.data;
// };

//New method now we fetches the posts for the specific page ,we send page number to the backend.
export const fetchPosts = async (page) => {
  const fullArray = await API.get(`/posts?page=${page}`);
  return fullArray.data;
};

//Query parameters are include for search the post
export const fetchPostsBySearch = async (searchQuery) => {
  //Query parameters are always begin with "?" we can see below
  const searchedPosts = await API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
  return searchedPosts;
};

//post detail
export const getSinglePost = async (id) => {
  const getPost = await API.get(`/posts/${id}`);
  return getPost;
};

export const createPost = async (newpost) => {
  const singleData = await API.post("/posts", newpost);
  return singleData.data;
};

export const updatePost = async (id, updatedPost) => {
  const updatedData = await API.patch(`/posts/${id}`, updatedPost);
  return updatedData;
};

export const deletePost = async (id) => {
  const deleteId = await API.delete(`/posts/${id}`);
  return deleteId;
};

export const likePost = async (id) => {
  const likePost = await API.patch(`/posts/${id}/likePost`);
  return likePost;
};

export const commentPost = async (finalComment, id) => {
  const commentPost = await API.post(`/posts/${id}/commentPost`, {
    finalComment,
    id,
  });
  return commentPost;
};

export const signIn = (formData) => {
  const data = API.post("/user/signin", formData);
  return data;
};

export const signUp = (formData) => {
  const data = API.post("/user/signup", formData);
  return data;
};

//Need to implement real chat feature

//get searched User

export const searchUser = async (search) => {
  const data = await API.get(`/chat/users?search=${search}`);
  return data;
};

export const createChat = async (userId) => {
  const data = await API.post("/chat", { userId });
  return data;
};

export const fetchChats = async () => {
  const data = await API.get(`/chat`);
  return data;
};

//Chat
export const addGroupMember = async (group) => {
  //For create the group for first time
  const data = await API.post("/chat/group", group);
  return data;
};

export const renameGroup = async (group) => {
  const data = await API.put("/chat/rename", group);
  return data;
};

export const removeMemberFromGroup = async (id) => {
  const data = await API.put("/chat/groupremove", id);
  return data;
};

export const addToGroup = async (group) => {
  //Add grp member in the existing grp
  const data = await API.put("/chat/groupadd", group);
  return data;
};

// MESSAGES
export const sendMessage = async (content) => {
  const data = await API.post("/message", content);
  return data;
};

export const fetchMessages = async (chatId) => {
  const data = await API.get(`/message/${chatId}`);
  return data;
};
