import React, { useEffect, useState } from "react";
import { Container, Grid, Grow, Typography, AppBar } from "@material-ui/core";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "./store/posts";
import "./index.css";
import { getPosts } from "./store/actions/postsActions";

// import { postActions } from "./store/posts";

const App = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const allPosts = useSelector((state) => {
    return state.post.posts;
  });
  const fetchPosts = useSelector((state) => {
    return state.post.getCall;
  });

  useEffect(() => {
    // dispatch(getPosts());
    dispatch(getAllPosts());
  }, [fetchPosts]);
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" align="center">
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
