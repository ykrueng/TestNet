import React from "react";
import { Segment, Header, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import { postQuizz } from "../../store/actions";

import Unauthorized from "../Login/Unauthorized";
import LoaderOrError from '../LoaderOrError/LoaderOrError';

class QuizForm extends React.Component {
  state = {
    title: "",
    topic: ""
  };

  componentWillReceiveProps(props) {
    if (props.quiz.id) this.props.history.push(`/quizzes/quiz/update/${props.quiz.id}`);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const quiz = { title: this.state.title, topic: this.state.topic };
    this.props.postQuizz(quiz, this.props.user.username, this.props.token);
  };

  render() {
    const { postingQuiz, postingQuizError } = this.props;
    if (!this.props.token)
      return (
        <Unauthorized
          headerText="Sign In to Add New Quiz"
          cancelText="Back to Quiz List"
          onCancel={() => this.props.history.push("/quizzes")}
        />
      );
    return (
      <Segment
        secondary
        color="teal"
        style={{ maxWidth: "40rem", margin: "10rem auto", textAlign: "center" }}
      >
        <Header as="h2">Create A New Quiz</Header>
        <Form onSubmit={this.handleSubmit} style={{marginBottom: "1rem"}}>
          <Form.Input
            required
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Quiz title.."
          />
          <Form.Input
            required
            name="topic"
            value={this.state.topic}
            onChange={this.handleChange}
            placeholder="Quiz topic.."
          />
          <Button icon="add" content="Create" color="teal" />

          <Button
            basic
            content="Cancel"
            icon="cancel"
            onClick={() => this.props.history.push("/quizzes")}
          />
        </Form>
        <LoaderOrError process={postingQuiz} error={postingQuizError} errorMsg="Failed to Post A Quiz" text="Posting..." />
      </Segment>
    );
  }
}

export default connect(
  ({ loginReducer, quizzReducer }) => ({
    token: loginReducer.token,
    user: loginReducer.user,
    quiz: quizzReducer.quizz,
    postingQuiz: quizzReducer.postingQuiz,
    postingQuizError: quizzReducer.postingQuizError,
  }),
  { postQuizz }
)(QuizForm);
