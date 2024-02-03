import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../Context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../utils/ChatLogics";
import { Avatar, Tooltip } from "@mui/material";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((msg, i) => (
          <div style={{ display: "flex" }} key={msg?._id}>
            {(isSameSender(messages, msg, i, user?.result?._id) ||
              isLastMessage(messages, i, user?.result?._id)) && (
              <Tooltip title={msg?.sender?.name} placement="bottom-start">
                <Avatar
                  sx={{
                    mt: 1,
                    mr: 1,
                    cursor: "pointer",
                    width: "25px",
                    height: "25px",
                  }}
                  src={msg?.sender?.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  msg?.sender?._id === user?.result?._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(
                  messages,
                  msg,
                  i,
                  user?.result?._id
                ),
                marginTop: isSameUser(messages, msg, i, user?.result?._id)
                  ? 3
                  : 10,
              }}
            >
              {msg?.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
