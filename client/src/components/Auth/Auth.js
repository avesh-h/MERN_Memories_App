import React, { useState } from "react";
import useStyle from "./styles";
import {
  Container,
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./common/Input";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { GoogleLogin } from "react-google-login";
import Icon from "./icon";

const Auth = () => {
  const classes = useStyle();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  // const isSignup = false;
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const switchMode = () => {
    setIsSignup(!isSignup);
    handleShowPassword(false);
  };
  const googleSuccess = async (res) => {
    console.log(res);
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("User's registration is failed");
  };
  return (
    <GoogleOAuthProvider clientId="276320922714-ls8q6jdh2rbfc8qe3ck81d9a8096q5mm.apps.googleusercontent.com">
      <Container component="main" maxWidth="xs">
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
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}

              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  handleChange={handleChange}
                  label="Re-type Password"
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
              <GoogleLogin
                // render={(renderProps) => (
                //   <Button
                //     className={classes.googleButton}
                //     color="primary"
                //     fullWidth
                //     onClick={renderProps.onClick}
                //     disabled={renderProps.disabled}
                //     startIcon={<Icon />}
                //     variant="contained"
                //   >
                //     Google Sign In
                //   </Button>
                // )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
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
    </GoogleOAuthProvider>
  );
};

export default Auth;
