import React from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import dummydata from "./dummydata";
import NavBar from "./components/NavBar";
import QuizView from "./views/QuizView";
import Quiz from "./components/Quiz/Quiz";
import PostList from "./components/Post/PostList";
import { login, register } from "./store/actions";

class App extends React.Component {
  state = {
    isAuthed: false
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ isAuthed: true });
    }
    // this.props.login({
    //   email: "boom@cooltable.io",
    //   password: "password",
    // })
    console.log(dummydata);
  }
  render() {
    console.log(dummydata);
        <NavBar />


        {isAuthed && (
          <input
            type="text"
            name="comment"
            placeholder="logged in comment area"
          />
        )}
        <Route
          path="/"
          render={() => (
            <h1>Welcome to our Fancy Special Exciting Homepage!</h1>
          )}
        />
        <Route
          exact
          exact
          render={props => <QuizView {...props} quizzes={dummydata.quizzes} />}
          render={() => (
        <Route
          path="/quizzes/:title"
          render={props => <Quiz {...props} quizzes={dummydata.quizzes} />}
        />
          exact
        <Route exact path="/dummy" render={props => <DummyView {...props} />} />
          path="/quizzes"
          render={props => <QuizView {...props} quizzes={dummydata.quizzes} />}
        />
        <Route
          path="/quizzes/:title"
export default withRouter(
  connect(
    state => ({
      loggedIn: state.loginReducer.loggedIn
    }),
    { login, register }
  )(App)
);
}

export default withRouter(
  connect(
    state => ({
      loggedIn: state.loginReducer.loggedIn
    }),
    { login, register }
  )(App)
);
