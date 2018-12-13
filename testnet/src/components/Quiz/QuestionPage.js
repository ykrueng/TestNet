import React from "react";
import Review from "./Review";
import NextButton from "./NextButton";
import { Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { checkAnswer, getQuestion } from "../../store/actions/quizzActions";
import QuestionDisplay from "./QuestionDisplay";

class QuestionPage extends React.Component {
  state = {
    answers: [],
    current: "",
    question: {},
    rubric: [],
    progress: 0
  };
  componentDidMount() {
    const quizId = this.props.match.params.id;
    const questionId = this.props.match.params.questionId;
    if (this.props.history.location === `/quizzes/${quizId}/review`) {
      return;
    }
    this.props.getQuestion(quizId, questionId);
  }

  handleChange = (index, answer) => {
    this.setState({
      current: answer
    });
    const quizId = this.props.match.params.id;
    const questionId = this.props.match.params.questionId;
    this.props.checkAnswer(quizId, questionId, { option: index + 1 });
  };
  updateState = () => {
    this.setState({
      current: "",
      answers: [...this.state.answers, this.state.current],
      rubric: [...this.state.rubric, this.props.answer]
    });
  };
  nextQuestion = () => {
    const quizId = this.props.match.params.id;
    const questionId = parseInt(this.props.match.params.questionId);
    const next = this.props.questions.find(
      question => question.id === questionId + 1
    );
    if (!next) {
      this.updateState();
      this.props.history.push(`/quizzes/${quizId}/review`);
    } else {
      this.updateState();
      this.props.getQuestion(quizId, next.id);
      this.props.history.push(`/quizzes/${quizId}/${next.id}`);
    }
  };

  render() {
    const { question, questions, checkingAnswer } = this.props;
    const { rubric, answers, current, progress } = this.state;
    const id = parseInt(this.props.match.params.questionId, 10);
    const nextId = questions.find(question => question.id === id);

    if (!nextId) {
      return (
        <Review
          answers={answers}
          rubric={rubric}
          match={this.props.match}
          history={this.props.history}
          questions={this.props.questions}
        />
      );
    }
    if (!question) {
      return <h1>Duh</h1>;
    }
    return (
      <Grid centered columns={3} style={{ margin: "0 auto" }}>
        <Grid.Column style={{ marginTop: "5rem" }}>
          {this.props.fetchingQuestion && (
            <Header as="h1" content="Loading..." />
          )}
          <QuestionDisplay
            question={question}
            change={this.handleChange}
            current={current}
          />
          <NextButton
            next={this.nextQuestion}
            progress={progress}
            checking={checkingAnswer}
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
    question: quizzReducer.question,
    answer: quizzReducer.answer,
    checkingAnswer: quizzReducer.checkingAnswer,
    fetching: quizzReducer.fetchingQuestion,
    error: quizzReducer.error
  };
};

export default connect(
  mapStateToProps,
  { checkAnswer, getQuestion }
)(QuestionPage);
