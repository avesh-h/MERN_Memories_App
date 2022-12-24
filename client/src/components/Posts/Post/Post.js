import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../store/posts";
import useStyle from "./styles";
import { postActions } from "../../../store/posts";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deletePost(id));
    dispatch(postActions.getPostsCall());
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant="h5" className={classes.title} gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" component="p" color="textSecondary">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button
          size="small"
          color="primary"
          onClick={async () => {
            await dispatch(likePost(post._id));
            dispatch(postActions.getPostsCall());
          }}
        >
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            handleDelete(post._id);
          }}
        >
          <DeleteIcon fontSize="small" />
          &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
