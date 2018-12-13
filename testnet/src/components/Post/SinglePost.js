import React from "react";
import { connect } from "react-redux";
import { getPost } from "../../store/actions/postActions";

class SinglePost extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Segment>
        <Header>
          Title
          <Header.Subheader>Created At:</Header.Subheader>
        </Header>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  const { postReducer } = state;
  return {
    post: postReducer.post
  };
};

export default connect(
  mapStateToProps,
  { getPost }
)(SinglePost);
