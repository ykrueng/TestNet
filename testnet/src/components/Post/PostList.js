import React from "react";
import { Header, Comment, Segment } from "semantic-ui-react";
import { Route } from "react-router-dom";
import SinglePost from "./SinglePost";

const PostList = ({ posts, history }) => {
  return (
    <Segment>
      {posts.map((post, index) => (
        <Segment
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/posts/${post.id}`)}
        >
          <Header as="h2" dividing block color="teal">
            {post.title}
            <Header.Subheader content={post.author} />
          </Header>
          <Comment>
            {post.body}
            <Comment.Metadata>{post.created_at}</Comment.Metadata>
          </Comment>
        </Segment>
      ))}

      <Route path="/posts/:id" render={props => <SinglePost {...props} />} />
    </Segment>
  );
};

export default PostList;
