import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getPost } from "../../store/actions/postActions";
import { Header, Container, Divider, Button, Segment } from "semantic-ui-react";
import { getComments, postComment } from "../../store/actions/postActions";

class SinglePost extends React.Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  render() {
    const { post, history } = this.props;

    const { id } = this.props.match.params;
    return (
      post && (
        <Fragment>
          <Header as="h2" color="teal" block>
            {post.title}
            <Header.Subheader>Created At:{post.created_at}</Header.Subheader>
          </Header>
          <Container>{post.body}</Container>
          {this.props.location.pathname.length < 9 && (
            <Fragment>
              <Divider horizontal>Or</Divider>
              <Segment basic textAlign="center">
                <Button
                  basic
                  color="teal"
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
    comments: postReducer.comments,
    token: loginReducer.token
  };
};

export default connect(
  mapStateToProps,
  { getPost, getComments, postComment }
)(SinglePost);
