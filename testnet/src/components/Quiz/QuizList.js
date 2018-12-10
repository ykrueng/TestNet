import React from "react";

const QuizList = props => {
  // console.log(props.quizzes[0].id);
  return (
    <div className="quiz-list">
      {props.quizzes.map(quiz => (
        <div className="quiz-card" key={quiz.id}>
          <h1>{quiz.title}</h1>
          <p>{quiz.author}</p>
          <ul>
            {quiz.questions.map(q => (
              <div key={q.question}>
                <li>{q.question}</li>
                {q.answers.map(ans => (
                  <li key={ans}>{ans}</li>
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
