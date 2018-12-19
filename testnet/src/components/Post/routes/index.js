import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Forum from "../../../views/Forum";
import SinglePost from "../SinglePost";
import SingleComment from "../SingleComment";
import CommentSection from "../Comments";

const PostRoutes = () => {
  return (
    <Fragment>
      <Route exact path="/forum" render={props => <Forum {...props} />} />
      <Route path="/posts/:id" render={props => <SinglePost {...props} />} />
      <Route
        exact
        path="/posts/:id/comments"
        render={props => <CommentSection {...props} />}
      />
      <Route
        exact
        path="/posts/:id/comments/:commentId"
        render={props => <SingleComment {...props} />}
      />
    </Fragment>
  );
};

export default PostRoutes;
