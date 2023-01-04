import React, { useState, useEffect } from "react";
import useStyle from "./styles";
import { Typography, TextField, Paper, Button } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { createPost, updatePost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../store/posts";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const EditPost = useSelector((state) => {
    if (currentId) {
      const findPost = state.post.posts.find((post) => post._id === currentId);
      return findPost;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (EditPost) {
      setPostData(EditPost);
    }
  }, [EditPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      const fullData = {
        id: currentId,
        update: postData,
        name: user?.result?.name,
      };
      await dispatch(updatePost(fullData));
      dispatch(postActions.getPostsCall());
    } else {
      await dispatch(createPost({ ...postData, name: user?.result?.name }));
      dispatch(postActions.getPostsCall());
    }

    handleClear();
  };
  const handleClear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  // if (!user?.result?.name) {
  //   return (
  //     <Paper className={classes.paper}>
  //       <Typography variant="h6" align="center">
  //         Please Sign In to create your own memories and like other's memories.
  //       </Typography>
  //     </Paper>
  //   );
  // }
  return !user?.result?.name ? (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
        Please Sign In to create your own memories and like other's memories.
      </Typography>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing` : `Creating`} Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(",") });
          }}
        />
        <div>
          <FileBase64
            type="file"
            multiple={false}
            onDone={(base64) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
          <Button
            type="submit"
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;
