import React from "react";
import { connect } from "react-redux";
import { Button, Comment, Form, Segment, Grid } from "semantic-ui-react";
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
            <Comment.Group style={{ margin: "0 auto" }}>
              {comments.map((comment, i) => (
                <Comment
                  key={i}
                  onClick={() =>
                    history.push(`/posts/${id}/comments/${comment.id}`)
                  }
                >
                  <Comment.Avatar src={comment.author_img} />
                  <Comment.Content>
                    <Comment.Author>{comment.author}</Comment.Author>
                    <Comment.Metadata>
                      <p>{comment.created_at}</p>
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

const mapStateToProps = ({ loginReducer, postReducer }) => ({
  token: loginReducer.token,
  comments: postReducer.comments,
  updating: postReducer.updatingComment,
  adding: postReducer.addingComment,
  deleting: postReducer.deletingComment
});

export default connect(
  mapStateToProps,
  { getComments, postComment }
)(CommentSection);
