import React from "react";

export const QuizView = props => {
  return (
    <div>
      {props.quizzes.map(quiz => (
        <div>
          <h1>{quiz.title}</h1>
          <p>{quiz.author}</p>
        </div>
      ))}
      <h1>Quiz Name Here</h1>
    </div>
  );
};
