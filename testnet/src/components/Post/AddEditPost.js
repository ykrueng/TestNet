import React, { Fragment } from "react";
import { Form, Grid, Divider, Label } from "semantic-ui-react";
import { updatePost, postPost, deletePost } from "../../store/actions/postActions";
import { connect } from "react-redux";

class AddEditPost extends React.Component {
  state = {
    title: "",
    body: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  delete = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id, this.props.token);
    this.props.history.push("/forum");
  };

  handleSubmit = () => {
    const post = {
      title: this.state.title.length > 0 ? this.state.title : undefined,
      body: this.state.body.length > 0 ? this.state.body : undefined
    };
    if (this.props.edit) {
      const { id } = this.props.match.params;
      this.props.updatePost(id, post, this.props.token);
      this.props.history.push(`/posts/${id}`);
    } else {
      this.props.postPost(post, this.props.token);
      this.props.history.push("/forum");
    }
  };

  render() {
    const { edit } = this.props;
    return (
      <Fragment>
        <Divider section horizontal content={edit ? "Edit Your Post" : "Add New Post"} />
        <Grid centered container columns={2}>
          <Grid.Column>
            <Form widths="equal" onSubmit={this.handleSubmit}>
              <Label basic color="teal" ribbon content="Post Title" />
              <Form.Input name="title" value={this.state.title} onChange={this.handleChange} />
              <Label basic color="teal" ribbon="right" content="Description" />
              <Form.TextArea
                name="body"
                value={this.state.body}
                onChange={this.handleChange}
                rows={8}
              />

              <Form.Button
                color="teal"
                floated="right"
                style={{ marginBottom: "1%" }}
                content={edit ? "Submit Edit" : "Add Post"}
              />
              {edit && (
                <Form.Button
                  color="red"
                  basic
                  floated="right"
                  content="Delete Post"
                  onClick={this.delete}
                />
              )}
            </Form>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(
  ({ loginReducer, postReducer }) => ({
    token: loginReducer.token,
    adding: postReducer.addingPost,
    updating: postReducer.updatingPost
  }),
  { postPost, updatePost, deletePost }
)(AddEditPost);
