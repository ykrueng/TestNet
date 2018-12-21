import React from "react";
import PostList from "../components/Post/PostList";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from "../store/actions/postActions";

class Forum extends React.PureComponent {
  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.props.getPosts();
    }
  }

  render() {
    const { user, posts } = this.props;
    return (
      <div className="posts-container">
        <Route
          exact
          path="/forum"
          render={props => <PostList {...props} posts={posts} user={user} />}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ postReducer }) => ({
  posts: postReducer.posts,
  adding: postReducer.addingPost,
  deleting: postReducer.deletingPost
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Forum);
