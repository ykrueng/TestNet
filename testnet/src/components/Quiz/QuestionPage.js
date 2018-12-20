import React from "react";
import Review from "./Review";
import NextButton from "./NextButton";
import { checkAnswer, getQuestion } from "../../store/actions/quizzActions";
import QuestionDisplay from "./QuestionDisplay";
import { Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";

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
    if (questionId === "review") {
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
      rubric: [...this.state.rubric, this.props.answer],
      progress: this.state.progress + 100 / this.props.questions.length
    });
  };

  nextQuestion = () => {
    const quizId = this.props.match.params.id;
    const questionId = parseInt(this.props.match.params.questionId);
    const index = this.props.questions.findIndex(
      question => question.id === questionId
    );
    const nextQ = this.props.questions[index + 1];

    if (!nextQ) {
      this.updateState();
      this.props.history.push(`/quizzes/${quizId}/review`);
    } else {
      this.updateState();
      this.props.getQuestion(quizId, nextQ.id);
      this.props.history.push(`/quizzes/${quizId}/${nextQ.id}`);
    }
  };

  render() {
    const { question, questions, checkingAnswer } = this.props;
    const { rubric, answers, current, progress } = this.state;
    const id = parseInt(this.props.match.params.questionId, 10);
    let index = this.props.questions.findIndex(question => question.id === id);
    const next = questions[index];

    if (!next) {
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
      return <Header as="h1" content="Loading.." />;
    }

    return (
      <Grid centered columns={3} style={{ margin: "0 auto" }}>
        <Grid.Column style={{ marginTop: "5rem" }}>
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
