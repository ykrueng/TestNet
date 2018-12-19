import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getPost } from "../../store/actions/postActions";
import { Header, Container, Button } from "semantic-ui-react";
// import { getComments } from "../../store/actions/postActions";
// import CommentSection from "./Comments";

class SinglePost extends React.Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    // this.props.getComments(this.props.match.params.id);
  }

  render() {
    const { post, token } = this.props;
    const { id } = this.props.match.params;
    return (
      post && (
        <Fragment>
          <Header as="h2" color="teal" block>
            {post.title}
            <Header.Subheader>Created At:{post.created_at}</Header.Subheader>
          </Header>
          <Container>{post.body}</Container>
          <Button
            onClick={() => this.props.history.push(`/posts/${id}/comments`)}
          >
            Show Comments
          </Button>
          {/* <CommentSection
            comments={comments}
            token={token}
            match={this.props.match}
          /> */}
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
  };
};

export default connect(
  mapStateToProps,
  { getPost }
)(SinglePost);
