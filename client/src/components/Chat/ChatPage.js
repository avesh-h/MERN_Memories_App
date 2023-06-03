import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box } from "@material-ui/core";
import ChatBox from "../Chat/ChatBox";
import MyChats from "../Chat/MyChats";
import SideDrawer from "../miscellaneous/SideDrawer";

const ChatPage = () => {
  const { user } = ChatState();
  console.log("user", user);
  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        <MyChats />
        <ChatBox />
      </Box>
    </div>
  );
};

export default ChatPage;
