import React from "react";
import QuizList from "../components/Quiz/QuizList";
import { getQuizzes } from "../store/actions/quizzActions";
import { connect } from "react-redux";
import Quiz from "../components/Quiz/Quiz";
import QuestionPage from "../components/Quiz/QuestionPage";
import { Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Welcome from "../components/Welcome";

class QuizView extends React.Component {
  state = {
    isAuthed: false
  };
  componentDidMount() {
    this.props.getQuizzes();
  }
  render() {
    const { isAuthed } = this.state;
    return (
      <div>
        <NavBar click={this.props.click} />
        {isAuthed && (
          <input
            type="text"
            name="comment"
            placeholder="logged in comment area"
          />
        )}
        <Route exact path="/" component={Welcome} />
        <Route
          exact
          path="/quizzes"
          render={props => <QuizList {...props} quizzes={this.props.quizzes} />}
        />
        <Route
          exact
          path={`/quizzes/:id`}
          render={props => <Quiz {...props} />}
        />
        <Route
          exact
          path="/quizzes/:id/:questionId"
          render={props => <QuestionPage {...props} />}
        />
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
