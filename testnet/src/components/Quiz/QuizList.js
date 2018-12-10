import React from "react";

const QuizList = props => {
  const { quizzes, history } = props;
  return (
    <div className="quiz-list">
      {quizzes.map(quiz => (
        <div
          className="quiz-card"
          key={quiz.id}
          onClick={() => history.push(`/quizzes/${quiz.title}`)}
        >
          <h1>{quiz.title}</h1>
          <p>{quiz.author}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
