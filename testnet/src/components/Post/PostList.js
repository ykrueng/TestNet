import React from "react";
import { Header, Comment, Segment, Button, Card } from "semantic-ui-react";
import moment from "moment";

const PostList = ({ posts, history, user }) => {
  return (
    <Segment style={{ maxWidth: "80%", margin: "3% auto" }}>
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
            color={user && post.author !== user.username ? "teal" : null}
          >
            {post.title}
            <Header.Subheader>
              {post.author}
              {user && post.author === user.username && " (you)"}
            </Header.Subheader>
          </Header>
          <Comment>
            {post.body}
            <Comment.Metadata>{moment(post.created_at).fromNow()}</Comment.Metadata>
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

        <Card.Content
          extra
          textAlign="right"
          content="All posts are subject to approval by our team od moderators"
        />
      </Card>
    </Segment>
  );
};

export default PostList;
