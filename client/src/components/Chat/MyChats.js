import React, { useState, useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { fetchChats } from "../../api/index";
import { ToastContainer, toast } from "react-toastify";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { chats, setChats, selectedChat, setSelectedChat } = ChatState();

  const getChats = async () => {
    try {
      const { data } = await fetchChats();
      setChats(data);
    } catch (error) {
      toast.error("Failed To Load chats!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //For fetch the chats
  // useEffect(() => {
  //   setLoggedUser(JSON.parse(localStorage.getItem("profile")));
  //   getChats();
  // }, []);
  return (
    <div>
      Mychats
      <ToastContainer />
    </div>
  );
};

export default MyChats;
