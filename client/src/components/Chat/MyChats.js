import React, { useState, useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { fetchChats } from "../../api/index";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { chats, setChats, selectedChat, setSelectedChat } = ChatState();

  const fetchChats = async () => {
    try {
      const data = await fetchChats();
      //append with old chat
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
    } catch (error) {}
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("profile")));
    fetchChats();
  }, []);
  return <div>Mychats</div>;
};

export default MyChats;
