import React from "react";
import { Button, Form } from "semantic-ui-react";

class QuestionPage extends React.Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  nextQuestion = (title, id) => {
    this.setState({ value: "" });
    this.props.history.push(`/quizzes/${title}/${id + 1}`);
  };

  render() {
    const id = parseInt(this.props.match.params.questionId, 10);
    const title = this.props.match.params.title;

    const quiz = this.props.quizzes.find(quiz => quiz.title === title);
    const question = quiz.questions[id - 1];
    return (
      <Form>
        <p>{`${question.id}.  ${question.question}`}</p>
        {question.answers.map((ans, index) => (
          <Form.Radio
            key={index}
            label={ans}
            value={index}
            onChange={this.handleChange}
            checked={this.state.value === index}
          />
        ))}
        <Button
          basic
          color="black"
          content={`Submit & Continue`}
          onClick={() => this.nextQuestion(title, id)}
        />
      </Form>
    );
  }
}

export default QuestionPage;
