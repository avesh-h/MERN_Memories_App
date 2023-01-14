import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button } from "@material-ui/core";
import useStyle from "./styles";
import { commentPost } from "../../store/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState([1, 2, 3, 4]);
  const [comment, setComment] = useState("");
  const classes = useStyle();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const submitComments = () => {
    const finalComment = `${user.result.name}:${comment}`;
    dispatch(commentPost({ finalComment, id: post._id }));
  };
  return (
    <div>
      <div>
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments.map((c, i) => {
          return (
            <Typography gutterBottom variant="subtitle1" key={i}>
              Comment {i}
            </Typography>
          );
        })}
      </div>
      <div style={{ width: "70%" }}>
        <Typography gutterBottom variant="h6">
          Write a Comment
        </Typography>
        <TextField
          fullWidth
          minRows={4}
          variant="outlined"
          label="Comment"
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          disabled={!comment}
          onClick={submitComments}
          style={{ marginTop: "10px" }}
          color="primary"
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
