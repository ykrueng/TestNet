import React from "react";

const QuizList = props => {
  return (
    <div className="quiz-list">
      {props.quizzes.map(quiz => (
        <div className="quiz-card">
          <h1>{quiz.title}</h1>
          <p>{quiz.author}</p>
          <ul>
            {quiz.questions.map(q => (
              <div key={q}>
                <li>{q.question}</li>
                {q.answers.map(ans => (
                  <li>{ans}</li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
