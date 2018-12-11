import React from "react";
import QuizList from "../components/Quiz/QuizList";
import { getQuizzes } from "../store/actions/quizzActions";
import { connect } from "react-redux";
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
  console.log(state);
  return {
    quizzes: quizzReducer.quizzes
  };
};
export default connect(
  mapStateToProps,
  { getQuizzes }
)(QuizView);
