import React, { Component } from "react";
import {
  Segment,
  Header,
  Form,
  Button,
  Icon,
  Divider
} from "semantic-ui-react";
import { connect } from "react-redux";

import { getQuizz, updateQuizz, deleteQuizz } from "../../store/actions";
import QuestionForm from "./QuestionForm";

class UpdateForm extends Component {
  state = {
    title: "",
    topic: ""
  };

  componentDidMount() {
    const { getQuizz, match, token } = this.props;
    getQuizz(match.params.id, token);
  }

  componentWillReceiveProps({ quiz }) {
    if (quiz.id === Number(this.props.match.params.id)) {
      this.setState({
        title: quiz.title,
        topic: quiz.topic
      });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleUpdate = e => {
    e.preventDefault();

    const { title, topic } = this.state;
    const { match, token, updateQuizz } = this.props;
    const quiz = { title, topic };
    const id = Number(match.params.id);

    updateQuizz(id, quiz, token);
  };

  handleDelete = () => {
    const { match, token, history, deleteQuizz } = this.props;

    const id = Number(match.params.id);
    deleteQuizz(id, token);

    console.log("deleted");
    history.push("/quizzes");
  };

  render() {
    const { title, topic } = this.state;
    const { history, quiz } = this.props;
    return (
      <Segment
        style={{
          maxWidth: "60rem",
          margin: "2rem auto"
        }}
      >
        {(quiz.title !== title || quiz.topic !== topic) && (
          <Button floated="right" primary onClick={this.handleUpdate}>
            <Icon className="save outline" /> Save
          </Button>
        )}
        <Button floated="right" onClick={() => history.push("/quizzes")}>
          <Icon className="cancel" /> Cancel
        </Button>
        <Button floated="right" onClick={this.handleDelete}>
          <Icon className="trash alternate outline" /> Delete
        </Button>
        <Header as="h2">Update Quiz</Header>
        <Form onSubmit={this.handleUpdate}>
          <Form.Group widths="equal">
            <Form.Input
              label="Title"
              name="title"
              value={title}
              onChange={this.handleChange}
              style={{
                border: "none"
              }}
            />
            <Form.Input
              label="Topic"
              name="topic"
              value={topic}
              onChange={this.handleChange}
              style={{
                border: "none"
              }}
            />
          </Form.Group>
        </Form>
        <Divider />
        <Header as="h2">Add Question</Header>
        <QuestionForm />
      </Segment>
    );
  }
}

export default connect(
  ({ loginReducer, quizzReducer }) => ({
    token: loginReducer.token,
    user: loginReducer.user,
    quiz: quizzReducer.quizz,
    fetchingQuizz: quizzReducer.fetchingQuizz
  }),
  { getQuizz, updateQuizz, deleteQuizz }
)(UpdateForm);
