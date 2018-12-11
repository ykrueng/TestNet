import React from "react";
import { Button, Form } from "semantic-ui-react";

class QuestionPage extends React.Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  nextQuestion = id => {
    this.setState({ value: "" });
    this.props.history.push(`/${this.props.match.url}/${id + 1}`);
  };

  render() {
    const id = this.props.match.params.id;
    console.log(this.props);
    const question = this.props.questions[id - 1];
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
          onClick={() => this.nextQuestion(id)}
        />
      </Form>
    );
  }
}

export default QuestionPage;
