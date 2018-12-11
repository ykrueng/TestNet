import React from "react";
import { Button, Form } from "semantic-ui-react";

class QuestionPage extends React.Component {
  state = {
    selected: ""
  };

  handleChange = e => {
    this.setState({ selected: e.target.value });
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
          <Form.Group inline key={ans + index}>
            <Form.Radio
              label={ans}
              value={`option${index}`}
              onChange={this.handleChange}
              checked={this.state.selected === `option${index}`}
            />
          </Form.Group>
        ))}
        <Button
          basic
          color="black"
          content={`Submit & Continue`}
          onClick={() => this.props.history.push(`/quizzes/${title}/${id + 1}`)}
        />
      </Form>
    );
  }
}

export default QuestionPage;
