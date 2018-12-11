import React from "react";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { getQuestions } from "../../store/actions/quizzActions";

class QuestionPage extends React.Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  nextQuestion = id => {
    this.setState({ value: "" });
    this.props.history.push(`/${this.props.match.url}/${id + 1}`);
  };

  render() {
    const id = this.props.match.params.questionId;
    const question = this.props.questions[id - 1];
    if (!question) {
      return <h1>There aren't any questions!</h1>;
    }
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

const mapStateToProps = state => {
  const { quizzReducer } = state;
  return {
    questions: quizzReducer.questions
  };
};

export default connect(
  mapStateToProps,
  { getQuestions }
)(QuestionPage);
