import React from "react";
import SingleComment from "./SingleComment";

import { connect } from "react-redux";
import { Button, Comment, Form, Segment } from "semantic-ui-react";
import { getComments, postComment } from "../../store/actions/postActions";

class CommentSection extends React.Component {
  state = {
    text: ""
  };

  componentDidMount() {
    this.props.getComments(this.props.match.params.id);
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  postComment = () => {
    const { token, postComment } = this.props;
    const { id } = this.props.match.params;
    postComment(id, this.state, token);
    // this.setState({ text: "" });
    this.props.history.push(`/posts/${id}`);
  };

  render() {
    const { comments } = this.props;
    const { id } = this.props.match.params;
    return (
      <Segment>
        <Comment.Group>
          {comments.map((comment, i) => (
            <Comment
              key={i}
              onClick={() =>
                this.props.history.push(`/posts/${id}/comments/${comment.id}`)
              }
            >
              <Comment.Content>
                <Comment.Author>{comment.author}</Comment.Author>
                <Comment.Metadata>
                  <div>{comment.created_at}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}

          <Form reply>
            <Form.TextArea
              value={this.state.text}
              onChange={this.handleChange}
            />
            <Button
              content="Add Reply"
              type="submit"
              labelPosition="left"
              icon="edit"
              onClick={this.postComment}
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
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
  { getComments, postComment }
)(CommentSection);
