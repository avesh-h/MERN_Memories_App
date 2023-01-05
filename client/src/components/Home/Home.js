import React, { useEffect, useState } from "react";
import {
  Grid,
  Grow,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";
import Pagination from "../Pagination/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import useStyle from "./styles";
import ChipInput from "material-ui-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyle();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(null);
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleKeyPress = (e) => {
    //Search functionality
    if (e.keyCode === 13) {
      //Search the post
    }
  };

  const handleAddTags = () => {};

  const handleDeleteTags = () => {};

  const userExist = useSelector((state) => {
    return state.auth.userExist;
  });
  const fetchPosts = useSelector((state) => {
    return state.post.getCall;
  });
  useEffect(() => {
    dispatch(getAllPosts());
  }, [fetchPosts, userExist]);
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value="test"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                onAdd={handleAddTags}
                onDelete={handleDeleteTags}
                variant="outlined"
                label="Search Tags"
              />
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
