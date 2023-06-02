import React, { useState, useEffect } from "react";
import useStyle from "./styles";
// import memories from "../../images/memories.png";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import Revibes from "../../images/Re-Vibes.png";
import { AppBar, Avatar, Button, Typography, Toolbar } from "@material-ui/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import decode from "jwt-decode";
import ChatIcon from "@mui/icons-material/Chat";

const Navbar = () => {
  const classes = useStyle();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
    setUser(null);
  };
  const userExist = useSelector((state) => {
    return state.auth.userExist;
  });
  useEffect(() => {
    //For check token is expired or not
    const token = user?.tokenId || user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logoutHandler();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, userExist]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="memories"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <button
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "auto",
                fontSize: "16px",
                background: "skyblue",
                border: "none",
                padding: "7px 7px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/posts/chats")}
            >
              <ChatIcon />
            </button>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.imageUrl}
            >
              {user?.result?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.name}
            </Typography>
            <Button
              className={classes.logout}
              color="secondary"
              variant="contained"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            variant="contained"
            to="/auth"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
