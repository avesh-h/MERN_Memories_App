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
import { getAllPosts, getPostsBySearch } from "../../store/posts";
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

  const serchPost = () => {
    if (search.trim() || tags) {
      //dispatch -> the fetch search post
      //Array join is actually converts the array into the string

      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));

      //So why this navigate address is matter ? (like example if we want send specific searched post to your friend then we have to add specific navigate(link) for that specific serched post, so thats why client side routing is required)
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${
          tags.join(",") || "none"
        }`
      );
    } else {
      navigate("/");
    }
  };
  const handleKeyPress = (e) => {
    //Search functionality
    if (e.keyCode === 13) {
      //Search the post
      serchPost();
    }
  };

  const handleAddTags = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTags = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

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
                value={search}
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
                value={tags}
              />
              <Button
                className={classes.searchButton}
                onClick={serchPost}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
