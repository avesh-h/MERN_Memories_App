import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box } from "@mui/material";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      sx={{
        display: { xs: selectedChat ? "flex" : "none", md: "flex" },
        alignItems: "center",
        flexDirection: "column",
        p: 3,
        bgcolor: "#fff",
        width: { xs: "100%", md: "68%" },
        borderRadius: 3,
        borderWidth: 1,
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
