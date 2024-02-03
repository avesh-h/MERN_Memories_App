import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Typography, Button, FormControl, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { getSender, getSenderObj } from "../../utils/ChatLogics";
import ProfileModal from "../miscellaneous/ProfileModal";
import UpdateChatGroupModal from "../miscellaneous/UpdateChatGroupModal";
import { io } from "socket.io-client";
import { CircularProgress } from "@mui/material";
import { sendMessage, fetchMessages } from "../../api/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  //typing animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const fetchMessageHandler = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await fetchMessages(selectedChat?._id);
      setLoading(false);
      setMessages(data);
      //Join the chat with socket by create room
      socket.emit("join chat", selectedChat?._id);
    } catch (error) {
      toast.error("Error while getting messages!", {
        position: "bottom-left",
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

  useEffect(() => {
    fetchMessageHandler();
    //To keep track of the current selected chat state so we can compare
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  //SOCKET setup of logged in user
  useEffect(() => {
    socket = io(
      process.env.REACT_APP_MY_LIVE_URL || process.env.REACT_APP_MY_LOCAL_URL
    );
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [user]);

  //Message recieved logic of SOCKET
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessageRecieved?.chat?._id
      ) {
        //Give notification
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  console.log("------->", notification);

  //Send message
  const sendMessageHandler = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      setNewMessage("");
      try {
        const { data } = await sendMessage({
          content: newMessage,
          chatId: selectedChat._id,
        });
        setMessages([...messages, data]);
        socket.emit("new message", data);
      } catch (error) {
        toast.error("Failed to send message!", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //Typing indicator logic will be here
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    // Throttling effect
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

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
                  fetchMessageHandler={fetchMessageHandler}
                />
              </>
            )}
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            p={3}
            bgcolor={"#E8E8E8"}
            width={"100%"}
            height={"100%"}
            borderRadius={2}
            overflow={"hidden"}
          >
            {/* Messages going to be here */}
            {loading ? (
              <CircularProgress
                size={20}
                sx={{ alignSelf: "center", margin: "auto" }}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl sx={{ mt: 3 }}>
              {isTyping ? (
                <Lottie
                  options={defaultOptions}
                  width={40}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              ) : (
                <></>
              )}
              <TextField
                type="text"
                onKeyDown={sendMessageHandler}
                sx={{
                  backgroundColor: "#E8E8E8",
                  "& .MuiInputBase-input": { p: 1 },
                }}
                placeholder="Enter a message.."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
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
      <ToastContainer />
    </>
  );
};

export default SingleChat;
