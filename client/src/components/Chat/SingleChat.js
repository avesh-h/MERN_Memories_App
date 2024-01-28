import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { getSender, getSenderObj } from "../../utils/ChatLogics";
import ProfileModal from "../miscellaneous/ProfileModal";
import UpdateChatGroupModal from "../miscellaneous/UpdateChatGroupModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            sx={{
              fontSize: { xs: "28px", md: "30px" },
              pb: 3,
              px: 2,
              width: "100%",
              fontFamily: "Work sans",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ display: { xs: "flex", md: "none" } }}
              startIcon={<ArrowBack />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat?.isGroupChat ? (
              <>
                {getSender(user, selectedChat?.users)}
                <ProfileModal user={getSenderObj(user, selectedChat?.users)} />
              </>
            ) : (
              <>
                {selectedChat?.chatName.toUpperCase()}
                <UpdateChatGroupModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"cneter"}
            p={3}
            bgcolor={"#E8E8E8"}
            width={"100%"}
            height={"100%"}
            borderRadius={2}
            overflow={"hidden"}
          >
            {/* Messages going to be here */}
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"100%"}
        >
          <Typography>Click on user to start chatting.</Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
