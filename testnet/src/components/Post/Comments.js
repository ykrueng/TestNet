import React from "react";
import SingleComment from "./SingleComment";

import { connect } from "react-redux";
import { Button, Comment, Form } from "semantic-ui-react";
import { getComments } from "../../store/actions/postActions";

class CommentSection extends React.Component {
  componentDidMount() {
    this.props.getComments(this.props.match.params.id);
  }
  render() {
    const { comments } = this.props;
    return (
      <Comment.Group>
        {comments.map((comment, i) => (
          <SingleComment key={i} com={comment} />
        ))}

        <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    );
  }
}

const mapStateToProps = state => {
  const { loginReducer, postReducer } = state;
  return {
    token: loginReducer.token,
    comments: postReducer.comments
  };
};

export default connect(
  mapStateToProps,
  { getComments }
)(CommentSection);
