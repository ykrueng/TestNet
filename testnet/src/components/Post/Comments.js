import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Button, Comment, Form, Segment, Grid, Header } from "semantic-ui-react";
import { getComments, postComment } from "../../store/actions/postActions";

class CommentSection extends React.PureComponent {
  state = {
    text: ""
  };

  componentDidMount() {
    this.props.getComments(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.props.getComments(this.props.match.params.id);
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  postComment = (id, token) => {
    this.props.postComment(id, this.state, token);
    this.setState({ text: "" });
  };

  render() {
    const { comments, history, token } = this.props;
    const { id } = this.props.match.params;
    return (
      <Segment>
        <Grid centered>
          <Grid.Column>
            {comments.length === 0 && <Header content="Be the First to Comment!" />}
            <Comment.Group style={{ margin: "0 auto" }}>
              {comments.map((comment, i) => (
                <Comment
                  key={i}
                  onClick={() => history.push(`/posts/${id}/comments/${comment.id}`)}
                >
                  <Comment.Avatar src={comment.author_img} />
                  <Comment.Content>
                    <Comment.Author>{comment.author}</Comment.Author>
                    <Comment.Metadata>
                      <p> {moment(comment.created_at).fromNow()}</p>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}

              <Form reply>
                <Form.TextArea value={this.state.text} onChange={this.handleChange} />
                <Button
                  content="Reply"
                  type="submit"
                  labelPosition="left"
                  icon="edit"
                  onClick={() => this.postComment(id, token)}
                  primary
                />
              </Form>
            </Comment.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default connect(
  ({ loginReducer, postReducer }) => ({
    token: loginReducer.token,
    comments: postReducer.comments,
    adding: postReducer.addingComment,
    updating: postReducer.updatingComment,
    deleting: postReducer.deletingComment
  }),
  { getComments, postComment }
)(CommentSection);
