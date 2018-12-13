import React from "react";
import NavBar from "../components/NavBar";
import QuizRoutes from "../components/Quiz/Routes";
import { getQuizzes } from "../store/actions/quizzActions";
import { connect } from "react-redux";

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
        <QuizRoutes quizzes={this.props.quizzes} />
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
