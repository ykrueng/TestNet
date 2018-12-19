import React from "react";
import { Comment } from "semantic-ui-react";
import { connect } from "react-redux";
import { getComment } from "../../store/actions/postActions";

class SingleComment extends React.Component {
  // state = {
  //   comment: ""
  // };
  componentDidMount() {
    this.props.getComment(this.props.com.post_id, this.props.com.id);
    // this.setState({ comment: this.props.comment });
  }

  render() {
    const { comment, com } = this.props;
    return (
      comment && (
        <Comment>
          <Comment.Avatar src={comment.author.img_url} />
          <Comment.Content>
            <Comment.Author>{com.author}</Comment.Author>
            <Comment.Metadata>
              <div>{com.created_at}</div>
            </Comment.Metadata>
            <Comment.Text>{com.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      )
    );
  }
}

const mapStateToProps = state => {
  const { postReducer } = state;
  return {
    comment: postReducer.comment
  };
};

export default connect(
  mapStateToProps,
  { getComment }
)(SingleComment);
