import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import ChatPage from "./components/Chat/ChatPage";
import { ChatProvider, ChatState } from "./Context/ChatProvider";

const App = () => {
  // const user = JSON.parse(localStorage.getItem("profile")) ;
  const { user } = ChatState();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("profile"));
  //   console.log("user", user);
  // }, [window.location.href]);
  return (
    // <Router>
    <Container maxWidth="lg">
      {/* <ChatProvider> */}
      <Navbar />
      <Routes>
        {/* if we entered in path like "/" then it immediatly forward to the
          '/posts' */}
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          path="/auth"
          element={user ? <Navigate to="/posts" /> : <Auth />}
        />
        <Route
          path="/posts/chats"
          element={user ? <ChatPage /> : <Navigate to="/posts" />}
        />
      </Routes>
      {/* </ChatProvider> */}
    </Container>
    // </Router>
  );
};

export default App;
