import React from "react";
import { Header, Segment } from "semantic-ui-react";

const QuizList = props => {
  const { quizzes, history } = props;
  return (
    <div className="quiz-list">
      {quizzes.map(quiz => (
        <Segment
          className="quiz-card"
          key={quiz.id}
          onClick={() => history.push(`/quizzes/${quiz.id}`)}
        >
          <Header as="h1" textAlign="center">
            {quiz.title}
            <Header.Subheader content={quiz.author} />
          </Header>
        </Segment>
      ))}
    </div>
  );
};

export default QuizList;
