import React from "react";
import { Header, Comment, Segment, Button, Card } from "semantic-ui-react";

const PostList = ({ posts, history, user }) => {
  return (
    <Segment>
      {posts.map((post, index) => (
        <Segment
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/posts/${post.id}`)}
        >
          <Header
            as="h2"
            dividing
            block
            color={post.author !== user.username ? "teal" : null}
          >
            {post.title}
            <Header.Subheader>
              {post.author}
              {post.author === user.username && " (you)"}
            </Header.Subheader>
          </Header>
          <Comment>
            {post.body}
            <Comment.Metadata>{post.created_at}</Comment.Metadata>
          </Comment>
        </Segment>
      ))}
      <Card centered raised color="teal">
        <Card.Content header="Something on Your Mind?" />
        <Card.Content>
          Join the discussion today!
          <br />
          Click the button below and tell us your thoughts!
          <br />
          <Button
            color="teal"
            icon="write"
            floated="right"
            onClick={() => history.push(`/forum/create`)}
          />
        </Card.Content>

        <Card.Content extra textAlign="right">
          All posts are subject to approval by our team of Moderators
        </Card.Content>
      </Card>
    </Segment>
  );
};

export default PostList;
