import React from "react";
import Review from "./Review";
import NextButton from "./NextButton";
import { checkAnswer, getQuestion } from "../../store/actions/quizzActions";
import QuestionDisplay from "./QuestionDisplay";
import debounce from "lodash/debounce";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

class QuestionPage extends React.PureComponent {
  state = {
    play: false,
    answers: [],
    current: "",
    question: {},
    rubric: [],
    progress: 0,
    proceed: false
  };

  componentDidMount() {
    const { id, questionId } = this.props.match.params;
    if (questionId === "review") return;
    this.props.getQuestion(id, questionId);
  }

  handleChange = (i, answer, ...args) => {
    this.setState({
      current: answer
    });
    this.delayedChange(...args, { option: i + 1 });
  };

  delayedChange = debounce((...args) => {
    this.props.checkAnswer(...args);
    this.setState({ proceed: true });
  }, 1000);

  updateState = () => {
    this.setState({
      current: "",
      proceed: false,
      answers: [...this.state.answers, this.state.current],
      rubric: [...this.state.rubric, this.props.answer],
      progress: this.state.progress + 100 / this.props.questions.length
    });
  };

  nextQuestion = (id, questionId) => {
    this.stopVoice();
    const index = this.props.questions.findIndex(
      question => question.id === parseInt(questionId, 10)
    );
    const nextQ = this.props.questions[index + 1];
    this.updateState();
    if (!nextQ) {
      this.props.history.push(`/quizzes/${id}/review`);
    } else {
      this.props.getQuestion(id, nextQ.id);
      this.props.history.push(`/quizzes/${id}/${nextQ.id}`);
    }
  };

  playVoice = () => {
    this.setState({ play: true });
  };

  stopVoice = () => {
    this.setState({ play: false });
  };

  render() {
    const { id, questionId } = this.props.match.params;
    const { question, questions } = this.props;
    let index = this.props.questions.findIndex(
      question => question.id === parseInt(questionId, 10)
    );
    if (!questions[index]) {
      return (
        <Review
          answers={this.state.answers}
          rubric={this.state.rubric}
          quizId={id}
          history={this.props.history}
        />
      );
    }
    if (!question) return <div />;

    return (
      <Grid centered columns={3} style={{ margin: "0 auto" }}>
        <Grid.Column style={{ marginTop: "5rem" }}>
          <QuestionDisplay
            play={this.state.play}
            playVoice={this.playVoice}
            pauseVoice={this.pauseVoice}
            stopVoice={this.stopVoice}
            question={question}
            change={this.handleChange}
            current={this.state.current}
            questionId={questionId}
          />
          <NextButton
            next={this.nextQuestion}
            quizId={id}
            questionId={questionId}
            progress={this.state.progress}
            checking={!this.state.proceed}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  ({ quizzReducer }) => ({
    question: quizzReducer.question,
    questions: quizzReducer.questions,
    answer: quizzReducer.answer,
    error: quizzReducer.error
  }),
  { checkAnswer, getQuestion }
)(QuestionPage);
