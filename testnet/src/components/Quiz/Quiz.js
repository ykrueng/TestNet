import React from "react";

class Quiz extends React.Component {
  render() {
    const title = this.props.match.params.title;
    const quiz = this.props.quizzes.find(quiz => quiz.title === title);
    return (
      <div className="quiz">
        <h2>{quiz.title}</h2>
        <button onClick={() => this.props.history.push(`/quizzes/${title}/1`)}>
          Begin Quiz
        </button>
      </div>
    );
  }
}

export default Quiz;
