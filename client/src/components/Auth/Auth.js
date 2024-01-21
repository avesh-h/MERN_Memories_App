import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { gapi } from "gapi-script";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signin, signup } from "../../store/auth";
import Input from "./common/Input";
import Icon from "./icon";
import useStyle from "./styles";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyle();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Signup
    if (isSignup) {
      const data = await dispatch(signup(formData));
      if (typeof data.payload === "string") {
        toast.error(data.payload, { position: "top-center" });
      } else {
        toast.success("Please verify your email");
        setFormData(initialState);
      }
    }
    //Signin
    else {
      const data = await dispatch(signin(formData));
      if (data.payload && typeof data.payload !== "string") {
        navigate("/");
      } else {
        toast.error(data.payload, { position: "top-center" });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //Switch Auth form (signup/signin)
  const switchMode = () => {
    if (!isSignup && searchParams.get("auth")) {
      setSearchParams({});
    } else {
      setSearchParams({ auth: "signin" });
    }
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  //GAPI is Necessary to solve the error of (popup closed by user)
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "276320922714-ls8q6jdh2rbfc8qe3ck81d9a8096q5mm.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  //TODO: signup with google should be added inside our database.(same function signup/signin)
  const googleSuccess = async (res) => {
    const { profileObj, googleId } = res;
    try {
      const payload = {
        googleId,
        ...profileObj,
      };
      if (!isSignup) {
        const response = await dispatch(signin(payload));
        if (response.payload && typeof response.payload !== "string") {
          navigate("/");
        } else {
          toast.error(response.payload, { position: "top-center" });
        }
      } else {
        //Need to add feature signup with google
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.error(error);
    console.error("User's registration is failed");
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  value={formData?.firstName}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  value={formData?.lastName}
                />
              </>
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              value={formData?.email}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              value={formData?.password}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                handleChange={handleChange}
                label="Re-type Password"
                type={"password"}
                value={formData?.confirmPassword}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            {!isSignup && (
              <GoogleLogin
                clientId={process.env.REACT_APP_CLIENT_ID}
                render={(renderProps) => (
                  <Button
                    className={classes.googleButton}
                    color="primary"
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                    variant="contained"
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
              />
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign In"
                    : "Don't have an account ? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
