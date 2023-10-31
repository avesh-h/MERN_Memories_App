import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Typography } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import ChatLoading from "../Chat/ChatLoading";
import { searchUser, createChat } from "../../api/index";
import UserListItem from "../UserAvatar/UserListItem";
import { CircularProgress } from "@mui/material";

export default function TemporaryDrawer() {
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingChat, setLoadingChat] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });
  const { user, setSelectedChat, Chats, setChats } = ChatState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const closeDrawer = () => toggleDrawer("left", false);

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
    }
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
  };

  //create chat with searched user
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await createChat(userId);
      setSelectedChat(data);
      setLoadingChat(false);
      toggleDrawer("left", false);
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
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
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
