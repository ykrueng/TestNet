import React from "react";
import NavBar from "../components/NavBar";
import QuizRoutes from "../components/Quiz/Routes";
import { getQuizzes, getTopics, logout } from "../store/actions";
import { connect } from "react-redux";

class QuizView extends React.PureComponent {
  componentDidMount() {
    this.props.getQuizzes();
    this.props.getTopics();
  }

  render() {
    const { loggedIn, click, quizzes, topics, logout, user } = this.props;
    return (
      <div>
        <NavBar
          logout={logout}
          loggedIn={loggedIn}
          click={click}
          user={user}
          getRegistrationFrom={this.props.getRegistrationFrom}
        />
        <QuizRoutes quizzes={quizzes} topics={topics} loggedIn={loggedIn} user={user} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loginReducer, quizzReducer } = state;
  return {
    quizzes: quizzReducer.quizzes,
    topics: quizzReducer.topics,
    loggedIn: loginReducer.loggedIn,
    user: loginReducer.user,
  };
};
export default connect(
  mapStateToProps,
  { getQuizzes, getTopics, logout }
)(QuizView);
