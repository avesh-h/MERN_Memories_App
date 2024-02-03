import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import SearchDrawer from "./SearchDrawer";
import { getSender } from "../../utils/ChatLogics";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, notification, setNotification, setSelectedChat } = ChatState();

  //Drawer
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Notification menu
  const [openNotification, setOpenNotification] = useState(null);
  const handleOpenNotification = (event) => {
    setOpenNotification(event.currentTarget);
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
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
          {/* Notification  */}
          <Button onClick={handleOpenNotification}>
            <NotificationBadge
              count={notification?.length}
              effect={Effect?.SCALE}
            />
            <NotificationsIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={openNotification}
            open={openNotification}
            onClose={handleCloseNotification}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {!notification?.length ? (
              <>{"No message received!"}</>
            ) : (
              <>
                {notification.map((notf) => (
                  <MenuItem
                    key={notf?._id}
                    onClick={() => {
                      setSelectedChat(notf.chat);
                      setNotification(notification.filter((n) => n !== notf));
                      handleCloseNotification();
                    }}
                  >
                    {notf?.chat?.isGroupChat
                      ? `New message in ${notf.chat.chatName}`
                      : `New message from ${getSender(
                          user,
                          notf?.chat?.users
                        )}`}
                  </MenuItem>
                ))}
              </>
            )}
          </Menu>
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
