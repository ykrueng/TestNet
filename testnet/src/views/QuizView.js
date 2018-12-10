import React from "react";
import QuizList from "../components/Quiz/QuizList";

class QuizView extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <QuizList quizzes={this.props.quizzes} history={this.props.history} />
      </div>
    );
  }
}

export default QuizView;
