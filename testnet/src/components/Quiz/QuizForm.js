import React from "react";
import { Segment, Header, Form, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { postQuizz } from "../../store/actions";

class QuizForm extends React.Component {
  state = {
    title: "",
    topic: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const quiz = {
      title: this.state.title,
      topic: this.state.topic
    };
    this.props.postQuizz(quiz, this.props.user.username, this.props.token);
    this.props.history.push("/quizzes");
  };
  render() {
    return (
      <Segment
        style={{
          maxWidth: "40rem",
          margin: "10rem auto",
          textAlign: "center"
        }}
      >
        <Header as="h2">Create A New Quiz</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Quiz title.."
          />
          <Form.Input
            name="topic"
            value={this.state.topic}
            onChange={this.handleChange}
            placeholder="Quiz topic.."
          />
          <Button color="teal" >
            <Icon className="add" /> Create
          </Button>

          <Button
            basic
            content="Cancel"
            onClick={() => {
              this.props.history.push("/quizzes");
            }}
          >
            <Icon className="cancel" /> Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(
  ({ loginReducer }) => ({
    token: loginReducer.token,
    user: loginReducer.user
  }),
  { postQuizz }
)(QuizForm);
