import React, { Component } from "react";
import { Segment, Header, Form, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";

import Unauthorized from "../Login/Unauthorized";

import {
  getQuizz,
  getQuestions,
  updateQuizz,
  deleteQuizz
} from "../../store/actions";
import QuestionForm from "./QuestionForm";

class UpdateForm extends Component {
  state = {
    title: "",
    topic: ""
  };

  componentDidMount() {
    const { getQuizz, getQuestions, match, token } = this.props;
    getQuizz(match.params.id, token);
    getQuestions(match.params.id);
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

    history.push("/quizzes");
  };

  render() {
    const { title, topic } = this.state;
    const { history, match, quiz, questions, token, user } = this.props;

    // user not logged in
    if (!token)
      return (
        <Unauthorized
          onCancel={() => history.push("/quizzes")}
          headerText="Sign In to Edit Quiz"
          cancelText="Back to Quiz List"
        />
      );

    // user not the author of quiz
    if (quiz.author && user.id !== quiz.author.id)
      return (
        <Unauthorized
          onCancel={() => history.push("/quizess")}
          headerText="You are not the author of this quiz"
          cancelText="Back to Quiz List"
          submit={false}
        />
      );

    // user is the author of quiz
    return (
      <Segment
        style={{
          maxWidth: "60rem",
          margin: "2rem auto"
        }}
      >
        {(quiz.title !== title || quiz.topic !== topic) && (
          <Button
            basic
            floated="right"
            color="teal"
            icon="save outline"
            content="Save"
            onClick={this.handleUpdate}
          />
        )}
        <Button
          basic
          color="grey"
          floated="right"
          icon="arrow left"
          content="Quiz List"
          onClick={() => history.push("/quizzes")}
        />
        <Button
          basic
          color="red"
          floated="right"
          icon="trash alternate outline"
          content="Delete"
          onClick={this.handleDelete}
        />
        <Header as="h2">Update Quiz</Header>
        <Form onSubmit={this.handleUpdate}>
          <Form.Group widths="equal">
            <Form.Input
              label="Title"
              name="title"
              value={title}
              onChange={this.handleChange}
              style={{ border: "none" }}
            />
            <Form.Input
              label="Topic"
              name="topic"
              value={topic}
              onChange={this.handleChange}
              style={{ border: "none" }}
            />
          </Form.Group>
        </Form>
        <Divider />
        <Header as="h2" content="Add Question" />
        <QuestionForm add history={history} match={match} />
        <Divider />
        <Header as="h2" content="Update Question" />
        {questions.length === 0 && (
          <Segment textAlign="center" content="No questions have been added." />
        )}
        {questions.map(question => (
          <QuestionForm
            key={question.id}
            question={question}
            history={history}
            match={match}
          />
        ))}
      </Segment>
    );
  }
}

export default connect(
  ({ loginReducer, quizzReducer }) => ({
    token: loginReducer.token,
    user: loginReducer.user,
    quiz: quizzReducer.quizz,
    questions: quizzReducer.questions,
    fetchingQuizz: quizzReducer.fetchingQuizz
  }),
  { getQuizz, updateQuizz, deleteQuizz, getQuestions }
)(UpdateForm);
