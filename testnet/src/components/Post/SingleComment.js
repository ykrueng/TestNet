import React from "react";
import { Comment, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getComment,
  updateComment,
  deleteComment
} from "../../store/actions/postActions";

class SingleComment extends React.Component {
  state = {
    reveal: false,
    text: ""
  };

  componentDidMount() {
    const { id, commentId } = this.props.match.params;
    this.props.getComment(id, commentId);
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  revealer = e => {
    e.preventDefault();
    this.setState({ reveal: !this.state.reveal });
  };

  editComment = () => {
    const comment = { text: this.state.text };
    const { id, commentId } = this.props.match.params;
    this.props.updateComment(id, commentId, comment, this.props.token);
    this.props.history.push(`/posts/${id}`);
  };

  deleteComment = () => {
    const { id, commentId } = this.props.match.params;
    this.props.deleteComment(id, commentId, this.props.token);
    this.props.history.push(`/posts/${id}`);
  };

  render() {
    const { comment } = this.props;

    return (
      comment && (
        <Comment.Group>
          <Comment>
            <Comment.Avatar src={comment.author.img_url} />
            <Comment.Content>
              <Comment.Author>{comment.author.username}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.created_at}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={this.revealer}>Edit</Comment.Action>
                <Comment.Action onClick={this.deleteComment}>
                  Delete
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
          {this.state.reveal && (
            <Form reply>
              <Form.TextArea
                value={this.state.comment}
                onChange={this.handleChange}
              />
              <Button
                content="Edit Comment"
                labelPosition="left"
                icon="edit"
                onClick={() => this.editComment()}
                primary
              />
            </Form>
          )}
        </Comment.Group>
      )
    );
  }
}

const mapStateToProps = state => {
  const { postReducer, loginReducer } = state;
  return {
    comment: postReducer.comment,
    token: loginReducer.token
  };
};

export default connect(
  mapStateToProps,
  { getComment, updateComment, deleteComment }
)(SingleComment);
