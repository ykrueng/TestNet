import React, { Fragment } from "react";
import { Form, Grid, Divider } from "semantic-ui-react";
import { updatePost } from "../../store/actions/postActions";
import { connect } from "react-redux";

class AddEditPost extends React.Component {
  state = {
    title: "",
    body: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { edit, add } = this.props;
    console.log(edit, add);
    return (
      <Fragment>
        <Divider
          section
          horizontal
          content={edit ? "Edit Your Post" : "Add New Post"}
        />
        <Grid centered container columns={2}>
          <Grid.Column>
            <Form widths="equal">
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

              <Form.Button
                content={edit ? "Submit Edit" : "Submit Post"}
                onSubmit={() => this.props.updatePost()}
              />
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
    updating: postReducer.updatingPost
  };
};

export default connect(
  mapStateToProps,
  { updatePost }
)(AddEditPost);
