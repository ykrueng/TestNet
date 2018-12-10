import React from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import dummydata from "./dummydata";
import NavBar from "./components/NavBar";
import QuizView from "./views/QuizView";
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
  }
  render() {
    console.log(dummydata);
    const { isAuthed } = this.state;
    return (
      <div>
        <NavBar />

        {isAuthed && (
          <input
            type="text"
            name="comment"
            placeholder="logged in comment area"
          />
        )}
        <Route
          exact
          path="/quizzes"
          render={props => <QuizView {...props} quizzes={dummydata.quizzes} />}
        />
        <Route exact path="/posts" render={props => <PostList {...props} />} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      loggedIn: state.loginReducer.loggedIn
    }),
    { login, register }
  )(App)
);
