import React, { Fragment } from "react";
import { Form, Grid, Divider } from "semantic-ui-react";
import { updatePost, postPost } from "../../store/actions/postActions";
import { connect } from "react-redux";

class AddEditPost extends React.Component {
  state = {
    title: "",
    body: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
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
      this.props.addPost(post, this.props.token);
      this.props.history.push("/forum");
    }
  };

  render() {
    const { edit } = this.props;
    console.log("wtf");
    return (
      <Fragment>
        <Divider
          section
          horizontal
          content={edit ? "Edit Your Post" : "Add New Post"}
        />
        <Grid centered container columns={2}>
          <Grid.Column>
            <Form widths="equal" onSubmit={this.handleSubmit}>
              <Form.Input
                name="title"
                label="Title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="Title of post.."
              />
              <Form.TextArea
                name="body"
                label="Text"
                value={this.state.body}
                onChange={this.handleChange}
                placeholder="Tell us about it..."
              />

              <Form.Button content={edit ? "Submit Edit" : "Add Post"} />
            </Form>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { loginReducer, postReducer } = state;
  return {
    token: loginReducer.token,
    updatingPost: postReducer.updatingPost,
    addingPost: postReducer.addingPost
  };
};

export default connect(
  mapStateToProps,
  { updatePost, postPost }
)(AddEditPost);
