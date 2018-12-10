import React from "react";

class QuizList extends React.Component {
  // console.log(props.quizzes[0].id);

  render() {
    const { quizzes } = this.props;
    return (
      <div className="quiz-list">
        {quizzes.map(quiz => (
          <div
            className="quiz-card"
            key={quiz.id}
            onClick={() => this.props.history.push(`/quizzes/${quiz.title}`)}
          >
            <h1>{quiz.title}</h1>
            <p>{quiz.author}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default QuizList;
