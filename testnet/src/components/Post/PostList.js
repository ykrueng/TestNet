import React from "react";
import { Header, Comment, Segment } from "semantic-ui-react";

const PostList = ({ posts }) => {
  return (
    <Segment>
      {posts.map((post, index) => (
        <Segment key={index}>
          <Header as="h3" key={index} dividing>
            {post.title}
            <Header.Subheader content={post.author} />
          </Header>
          <Comment>
            {post.body}
            <Comment.Metadata>{post.created_at}</Comment.Metadata>
          </Comment>
        </Segment>
      ))}
    </Segment>
  );
};

export default PostList;
