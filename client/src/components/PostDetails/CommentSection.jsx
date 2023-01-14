import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button } from "@material-ui/core";
import useStyle from "./styles";
import { commentPost } from "../../store/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const classes = useStyle();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  //Submit the comment functionality
  const submitComments = async () => {
    const finalComment = `${user.result.name}:${comment}`;

    //So we can store our dispatch response into any variable and we can get immediate change of the post ..

    const newComment = await dispatch(
      commentPost({ finalComment, id: post._id })
    );

    setComments(newComment.payload.comments);
    setComment("");

    //Add functionality for adding smooth scroll to our latest comment
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div>
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments?.map((c, i) => {
          return (
            <Typography gutterBottom variant="subtitle1" key={i}>
              <strong>{c.split(":")[0]}: </strong>
              {c.split(":")[1]}
            </Typography>
          );
        })}
        <div ref={commentsRef} />
      </div>
      {user?.result?.name && (
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
      )}
    </div>
  );
};

export default CommentSection;
