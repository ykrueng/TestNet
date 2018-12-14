import React from "react";
import PostList from "../components/Post/PostList";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CommentSection from "../components/Post/Comments";
import { getPosts } from "../store/actions/postActions";

class Forum extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    console.log(this.props.posts);
    return (
      <div className="posts-container">
        <PostList posts={this.props.posts} />

        <Route
          path="/posts/:id"
          render={props => <CommentSection {...props} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { postReducer } = state;
  return {
    posts: postReducer.posts
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Forum);
