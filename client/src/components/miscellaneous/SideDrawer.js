import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import SearchDrawer from "./SearchDrawer";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = ChatState();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Search Drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "white",
          width: "100%",
          padding: "5px 10px 5px 10px",
          borderRadius: "5px",
          justifyContent: "space-between",
        }}
      >
        <Button>
          <SearchDrawer />
        </Button>
        <Typography
          style={{
            fontFamily: "serif",
            fontSize: "2rem",
          }}
        >
          Chats
        </Typography>
        <Box>
          <Button>
            <NotificationsIcon />
          </Button>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar>H</Avatar>
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <ProfileModal setAnchorEl={setAnchorEl} user={user}>
              <MenuItem>My account</MenuItem>
            </ProfileModal>
            <Divider />
            <MenuItem onClick={() => navigate("/posts")}>Go Home</MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default SideDrawer;
