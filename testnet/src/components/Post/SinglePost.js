import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getPost } from "../../store/actions/postActions";
import { Header, Container, Divider, Button, Segment } from "semantic-ui-react";

class SinglePost extends React.Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, history, user } = this.props;
    const { id } = this.props.match.params;
    return (
      post && (
        <Fragment>
          <Header
            as="h1"
            color={user.id !== post.author.id && "blue"}
            block
            dividing
            textAlign="center"
          >
            {post.title}
            <Header.Subheader as="p">
              submitted by:
              {post.author ? ` ${post.author.username}` : "Loading"}
            </Header.Subheader>
          </Header>
          <div style={{ width: "60%", margin: "2% auto" }}>
            <Container fluid text textAlign="justified">
              <p>{post.body}</p>
            </Container>
          </div>

          {this.props.location.pathname.length < 9 && (
            <Fragment>
              {post.author.id === user.id && (
                <Segment basic textAlign="center">
                  <Button
                    basic
                    color="red"
                    onClick={() => history.push(`/posts/${id}/edit`)}
                  >
                    Edit Your Post
                  </Button>
                </Segment>
              )}
              <Divider horizontal>options</Divider>
              <Segment basic textAlign="center">
                <Button
                  basic
                  onClick={() => history.push(`/posts/${id}/comments`)}
                >
                  Show Comments
                </Button>
              </Segment>
            </Fragment>
          )}
        </Fragment>
      )
    );
  }
}

const mapStateToProps = state => {
  const { postReducer, loginReducer } = state;
  return {
    post: postReducer.post,
    token: loginReducer.token
    // user: loginReducer.user
  };
};

export default connect(
  mapStateToProps,
  { getPost }
)(SinglePost);
