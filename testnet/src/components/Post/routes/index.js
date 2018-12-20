import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Forum from "../../../views/Forum";
import SinglePost from "../SinglePost";
import SingleComment from "../SingleComment";
import CommentSection from "../Comments";
import AddEditPost from "../AddEditPost";

const PostRoutes = ({ user }) => {
  return (
    <Fragment>
      <Route
        exact
        path="/forum"
        render={props => <Forum {...props} user={user} />}
      />
      <Route
        path="/posts/:id"
        render={props => <SinglePost {...props} user={user} />}
      />
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
      <Route
        path="/posts/:id/edit"
        render={props => <AddEditPost {...props} />}
      />
    </Fragment>
  );
};

export default PostRoutes;
