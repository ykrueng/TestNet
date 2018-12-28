import React from "react";
import NavBar from "../components/NavBar";
import QuizRoutes from "../components/Quiz/Routes";
import { getQuizzes, getTopics, logout, clearQuiz, toggleAuthForm } from "../store/actions";
import { connect } from "react-redux";

class QuizView extends React.PureComponent {
  componentDidMount() {
    this.props.getQuizzes();
    this.props.getTopics();
  }

  render() {
    const { loggedIn, quizzes, topics, logout, user,clearQuiz, history, toggleAuthForm } = this.props;
    return (
      <div>
        <NavBar
          logout={logout}
          loggedIn={loggedIn}
          history={history}
          user={user}
          toggleAuthForm={toggleAuthForm}
        />
        <QuizRoutes
          quizzes={quizzes}
          topics={topics}
          loggedIn={loggedIn}
          user={user}
          clearQuiz={clearQuiz}
        />
      </div>
    );
  }
}

export default connect(
  ({ quizzReducer, loginReducer }) => ({
    quizzes: quizzReducer.quizzes,
    topics: quizzReducer.topics,
    loggedIn: loginReducer.loggedIn,
    user: loginReducer.user
  }),
  { getQuizzes, getTopics, logout, clearQuiz, toggleAuthForm }
)(QuizView);
