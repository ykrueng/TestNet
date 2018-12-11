import React from "react";
import PostList from "../components/Post/PostList";

class PostView extends React.Component {
  render() {
    return (
      <div className="posts-container">
        <PostList posts={this.props.posts} />
      </div>
    );
  }
}

export default PostView;
