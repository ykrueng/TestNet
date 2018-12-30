import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Welcome from "../../Welcome";
import QuizList from "../QuizList";
import Quiz from "../Quiz";
import QuestionPage from "../QuestionPage";
import QuizForm from "../QuizForm";
import UpdateForm from "../UpdateForm";

const QuizRoutes = ({ quizzes, topics, loggedIn, user, clearQuiz, fetchingQuizzes }) => {
  return (
    <Fragment>
      <Route exact path="/" component={Welcome} />
      <Route
        exact
        path="/quizzes"
        render={props => (
          <QuizList
            {...props}
            quizzes={quizzes}
            topics={topics}
            user={user}
            loggedIn={loggedIn}
            clearQuiz={clearQuiz}
            fetchingQuizzes={fetchingQuizzes}
          />
        )}
      />
      <Route
        exact
        path={`/quizzes/:id`}
        render={props => <Quiz {...props} loggedIn={loggedIn} user={user} />}
      />
      <Route exact path="/quizzes/:id/:questionId" render={props => <QuestionPage {...props} />} />
      <Route exact path="/quizzes/quiz/new/add" render={props => <QuizForm {...props} />} />
      <Route exact path="/quizzes/quiz/update/:id" render={props => <UpdateForm {...props} />} />
    </Fragment>
  );
};

export default QuizRoutes;
