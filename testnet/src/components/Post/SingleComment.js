import React from "react";
import { Comment, Form, Button, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import ReCAPTCHA from "react-google-recaptcha";

import { getComment, updateComment, deleteComment } from "../../store/actions/postActions";

const SITE_KEY = "6LeP1YMUAAAAAP3dZkGkycis0iE0IhxMe3iEXXUe";

class SingleComment extends React.Component {
  state = {
    reveal: false,
    text: "",
    value: null
  };

  componentDidMount() {
    const { id, commentId } = this.props.match.params;
    this.props.getComment(id, commentId);
  }

  delayedChange = debounce(e => {
    console.log(e);
    this.emitChange(e.target.value);
  }, 1000);

  handleChange = e => {
    e.persist();
    this.delayedChange(e);
  };

  emitChange = value => {
    this.setState({ text: value });
  };

  recaptchaHandler = value => {
    this.setState({ value });
  };

  revealer = e => {
    e.preventDefault();
    this.setState({ reveal: !this.state.reveal });
  };

  editComment = (id, commentId) => {
    const comment = { text: this.state.text };
    this.props.updateComment(id, commentId, comment, this.props.token);
    this.props.history.push(`/posts/${id}/comments`);
  };

  deleteComment = (id, comment) => {
    this.props.deleteComment(id, comment, this.props.token);
    this.props.history.push(`/posts/${id}/comments`);
  };

  render() {
    const { id, commentId } = this.props.match.params;
    const { comment, user } = this.props;
    return (
      comment && (
        <Grid centered>
          <Grid.Column>
            <Comment.Group style={{ margin: "0 auto" }}>
              <Comment>
                <Comment.Avatar src={comment.author.img_url} />
                <Comment.Content>
                  <Comment.Author>{comment.author.username}</Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.created_at}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  {user.id === comment.author.id && (
                    <Comment.Actions>
                      <Comment.Action onClick={this.revealer}>Edit</Comment.Action>
                      <Comment.Action onClick={() => this.deleteComment(id, commentId)}>
                        Delete
                      </Comment.Action>
                    </Comment.Actions>
                  )}
                </Comment.Content>
              </Comment>
              {this.state.reveal && (
                <Form reply>
                  <Form.TextArea value={this.state.comment} onChange={this.handleChange} />
                  <ReCAPTCHA
                    style={{ margin: "1% auto" }}
                    sitekey={SITE_KEY}
                    onChange={this.recaptchaHandler}
                  />
                  <Button
                    content="Edit Comment"
                    labelPosition="left"
                    disabled={!this.state.value}
                    icon="edit"
                    onClick={() => this.editComment(id, commentId)}
                    primary
                  />
                </Form>
              )}
            </Comment.Group>
          </Grid.Column>
        </Grid>
      )
    );
  }
}

export default connect(
  ({ postReducer, loginReducer }) => ({
    comment: postReducer.comment,
    token: loginReducer.token
  }),
  { getComment, updateComment, deleteComment }
)(SingleComment);
