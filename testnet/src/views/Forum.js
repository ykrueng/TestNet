import React from "react";
import PostList from "../components/Post/PostList";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from "../store/actions/postActions";

class Forum extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="posts-container">
        <Route
          exact
          path="/forum"
          render={props => <PostList {...props} posts={this.props.posts} />}
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
