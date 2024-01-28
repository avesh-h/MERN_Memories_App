import React, { useState, useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { fetchChats } from "../../api/index";
import { ToastContainer, toast } from "react-toastify";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../utils/ChatLogics";
import GroupChatModal from "../miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
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
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("profile")));
    getChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);
  return (
    <Box
      sx={{
        display: { xs: selectedChat ? "none" : "flex", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        bgcolor: "#fff",
        width: { xs: "100%", md: "31%" },
        borderRadius: 3,
        borderWidth: 1,
      }}
    >
      <Box
        sx={{
          pb: 3,
          px: 3,
          fontSize: { md: "30px", sm: "28px" },
          fontFamily: "Work sans",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography width={"50%"}>My Chats</Typography>
        <GroupChatModal>
          <Button
            sx={{ display: "flex", fontSize: { md: "10px", lg: "10px" } }}
            endIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="#f8f8f8"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {chats ? (
          <Stack overflow={"scroll"} gap={2}>
            {chats?.map((chat) => {
              return (
                <Box
                  key={chat?._id}
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bgcolor={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius={2}
                >
                  <Typography>
                    {!chat?.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default MyChats;
