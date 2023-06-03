import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("loc", location.pathname);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("profile"));
    setUser(userInfo);
    // if (!userInfo) navigate("/posts");
  }, [location]);
  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
