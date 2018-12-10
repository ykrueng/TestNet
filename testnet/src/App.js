import React from "react";
import { withRouter, Route, NavLink } from "react-router-dom";
import dummydata from "./dummydata";

class App extends React.Component {
  state = {
    isAuthed: false
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ isAuthed: true });
    }
  }
  render() {
    const { isAuthed } = this.state;
    return (
      <div>
        <nav>
          <NavLink to="/">Home</NavLink>
        </nav>
        Welcome to TestNet
        {isAuthed && (
          <input
            type="text"
            name="comment"
            placeholder="logged in comment area"
          />
        )}
        <Route
          exact
          path="/"
          render={props => <QuizView {...props} quizzes={dummydata} />}
        />
      </div>
    );
  }
}

export default withRouter(App);
