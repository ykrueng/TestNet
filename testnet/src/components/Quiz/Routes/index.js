import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Welcome from "../../Welcome";
import QuizList from "../QuizList";
import Quiz from "../Quiz";
import QuestionPage from "../QuestionPage";

const QuizRoutes = ({ quizzes, topics, loggedIn, user }) => {
  return (
    <Fragment>
      <Route exact path="/" component={Welcome} />
      <Route
        exact
        path="/quizzes"
        render={props => <QuizList {...props} quizzes={quizzes} topics={topics} user={user} />}
      />
      <Route
        exact
        path={`/quizzes/:id`}
        render={props => <Quiz {...props} loggedIn={loggedIn} user={user} />}
      />
      <Route
        exact
        path="/quizzes/:id/:questionId"
        render={props => <QuestionPage {...props} />}
      />
    </Fragment>
  );
};

export default QuizRoutes;
