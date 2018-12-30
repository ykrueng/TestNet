import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getPost } from "../../store/actions/postActions";
import { Header, Container, Divider, Button, Segment } from "semantic-ui-react";

class SinglePost extends React.Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.props.getPost(this.props.match.params.id);
    }
  }

  render() {
    const { post, history, user, location } = this.props;
    const { id } = this.props.match.params;
    return (
      post && (
        <>
          <Header
            as="h1"
            color={user && user.id !== post.author.id ? "teal" : null}
            block
            dividing
            textAlign="center"
          >
            {post.title}
            <Header.Subheader
              content={`submitted by: ${post.author ? `${post.author.username}` : "Loading"}`}
            />
            <Header.Subheader content={moment(post.created_at).fromNow()} />
          </Header>
          <div style={{ width: "60%", margin: "2% auto" }}>
            <Container fluid text textAlign="justified" content={post.body} />
          </div>

          {location.pathname.length < 11 && (
            <>
              {user && post.author.id === user.id && (
                <Segment basic textAlign="center">
                  <Button
                    basic
                    color="red"
                    content="Edit Your Post"
                    onClick={() => history.push(`/posts/${id}/edit`)}
                  />
                </Segment>
              )}
              <Divider horizontal content="options" />
              <Segment basic textAlign="center">
                <Button
                  basic
                  color="teal"
                  content="Show Comments"
                  onClick={() => history.push(`/posts/${id}/comments`)}
                />
              </Segment>
            </>
          )}
        </>
      )
    );
  }
}

export default connect(
  ({ postReducer, loginReducer }) => ({
    token: loginReducer.token,
    post: postReducer.post,
    updating: postReducer.updatingPost
  }),
  { getPost }
)(SinglePost);
