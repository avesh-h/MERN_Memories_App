import React from "react";
import Post from "./Post/Post";
import useStyle from "./styles";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  const classes = useStyle();
  const allPosts = useSelector((state) => {
    return state.post.posts;
  });

  return !allPosts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      specing={3}
    >
      {allPosts.map((post) => {
        return (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
