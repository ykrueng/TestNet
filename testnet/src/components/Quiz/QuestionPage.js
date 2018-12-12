import React from "react";
import Review from "./Review";
import { Button, Form, Grid, Progress } from "semantic-ui-react";
import { connect } from "react-redux";
import { checkAnswer } from "../../store/actions/quizzActions";
import { token } from "../../views/DummyView";

class QuestionPage extends React.Component {
  state = {
    answers: [],
    current: "",
    question: {},
    rubric: [],
    progress: 0
  };

  handleChange = (index, answer) => {
    this.setState({
      current: answer
    });
    const quizId = this.props.match.params.id;
    const id = parseInt(this.props.match.params.questionId);
    const question = this.props.questions[id];
    const questionId = question.id;
    this.props.checkAnswer(quizId, questionId, { option: index + 1 }, token);
  };
  nextQuestion = id => {
    const quiz = this.props.match.params.id;
    const question = this.props.questions[id - 1].question;

    if (id + 1 > this.props.questions.length) {
      this.props.history.push(`/quizzes/${quiz}/review`);
    }
    this.setState({
      current: "",
      answers: [
        ...this.state.answers,
        { question: question, answer: this.state.current }
      ],
      rubric: [...this.state.rubric, this.props.answer],
      progress: (id / this.props.questions.length) * 100
    });
    this.props.history.push(`/quizzes/${quiz}/${id}`);
  };

  render() {
    const id = parseInt(this.props.match.params.questionId, 10);
    const question = this.props.questions[id];

    if (!question || id > this.props.questions.length) {
      const { rubric, answers } = this.state;
      return (
        <Review
          answers={answers}
          rubric={rubric}
          questions={this.props.questions}
        />
      );
    }
    return (
      <Grid centered columns={5}>
        <Grid.Column>
          <Form>
            <p>{`${id + 1}.  ${question.question}`}</p>
            {question.options.map((ans, index) => (
              <Form.Radio
                key={index}
                // name={`option${id + 1}`}
                label={ans}
                value={ans}
                onChange={() => this.handleChange(index, ans)}
                checked={this.state.current === ans}
              />
            ))}
            <Button
              basic
              color="black"
              disabled={this.props.checkingAnswer ? true : false}
              content={`Submit & Continue`}
              onClick={() => this.nextQuestion(id + 1)}
            />
          </Form>
          <Progress
            percent={this.state.progress}
            label="Percent Completed"
            size="small"
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { quizzReducer } = state;
  return {
    questions: quizzReducer.questions,
    answer: quizzReducer.answer,
    checkingAnswer: quizzReducer.checkingAnswer
  };
};

export default connect(
  mapStateToProps,
  { checkAnswer }
)(QuestionPage);
