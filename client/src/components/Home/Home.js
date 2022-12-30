import React, { useEffect, useState } from "react";
import { Grid, Grow, Container } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";

const Home = () => {
  //   const classes = useStyle();
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
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          //   className={classes.mainContainer}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;