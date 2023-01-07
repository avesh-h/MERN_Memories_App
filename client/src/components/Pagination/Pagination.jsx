import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => {
    return state.post;
  });

  //now we update the getAllPosts fetch function so we paasses the page inside that function so it only fatches those posts of that specific page
  useEffect(() => {
    if (page) dispatch(getAllPosts(page));
  }, [page]);
  return (
    <Pagination
      className={{ ul: classes.ul }}
      page={Number(page) || 1}
      count={numberOfPages}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
