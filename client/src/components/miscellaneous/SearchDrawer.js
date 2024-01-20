import { TextField, Typography } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import { createChat, searchUser } from "../../api/index";
import ChatLoading from "../Chat/ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

export default function TemporaryDrawer() {
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingChat, setLoadingChat] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //Close Drawer
  const closeDrawer = () => toggleDrawer("left", false);

  //handler Search functionality
  const handleSearch = async (e) => {
    if (!search) {
      toast.error("Please add some Input", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        setLoading(true);
        const { data } = await searchUser(search);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast.error("Failed To Load Search Result!", {
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
    }
  };

  //create chat with searched user
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await createChat(userId);
      //append with old chat
      if (!chats?.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      closeDrawer();
    } catch (error) {
      toast.error(error.message, {
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

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 360,
        padding: "10px",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box>
        <Typography
          variant="h3"
          style={{ fontSize: "20px", fontWeight: "600" }}
        >
          Search User
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <TextField
            id="standard-basic"
            label="Search"
            style={{ width: "280px" }}
            variant="standard"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button sx={{ transform: "translateY(16px)" }} onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <Box sx={{ pt: "20px" }}>
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <CircularProgress />}
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <SearchIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <ToastContainer />
    </div>
  );
}
