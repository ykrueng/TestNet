import React from "react";
import QuizList from "../components/Quiz/QuizList";
import { getQuizzes } from "../store/actions/quizzActions";
import { connect } from "react-redux";
// import QuizList from "../components/Quiz/QuizList";
// import QuestionPage from "../components/Quiz/QuestionPage";
// import Quiz from "../components/Quiz/Quiz";
// import { Route } from "react-router-dom";

class QuizView extends React.Component {
  componentDidMount() {
    this.props.getQuizzes();
  }
  render() {
    return (
      <div>
        <QuizList quizzes={this.props.quizzes} history={this.props.history} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { quizzReducer } = state;
  return {
    quizzes: quizzReducer.quizzes
  };
};
export default connect(
  mapStateToProps,
  { getQuizzes }
)(QuizView);
