import React from "react";
import Review from "./Review";
import { Button, Form, Grid } from "semantic-ui-react";
import { connect } from "react-redux";

class QuestionPage extends React.Component {
  state = {
    answers: [],
    value: "",
    current: ""
  };

  handleChange = answer => {
    this.setState({
      current: answer
    });
  };

  nextQuestion = id => {
    const quiz = this.props.match.params.id;
    const question = this.props.questions[id - 1].question;
    if (id + 1 > this.props.questions.length) {
      this.props.history.push(`/quizzes/${quiz}/review`);
    }
    this.setState({
      value: "",
      answers: [
        ...this.state.answers,
        { question: question, answer: this.state.current }
      ]
    });
    this.props.history.push(`/quizzes/${quiz}/${id}`);
  };

  render() {
    const id = parseInt(this.props.match.params.questionId, 10);
    const question = this.props.questions[id];

    if (!question || id > this.props.questions.length) {
      return (
        <Review answers={this.state.answers} questions={this.props.questions} />
      );
    }
    console.log(this.state);
    return (
      <Grid centered columns={5}>
        <Grid.Column>
          <Form>
            <p>{`${id + 1}.  ${question.question}`}</p>
            {question.options.map((ans, index) => (
              <Form.Radio
                key={index}
                name={`${question.id}`}
                label={ans}
                value={ans}
                onChange={() => this.handleChange(ans)}
                checked={this.state.current === ans}
              />
            ))}
            <Button
              basic
              color="black"
              content={`Submit & Continue`}
              onClick={() => this.nextQuestion(id + 1)}
            />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { quizzReducer } = state;
  return {
    questions: quizzReducer.questions
  };
};

export default connect(mapStateToProps)(QuestionPage);
