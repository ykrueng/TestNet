import React from "react";
import { withRouter, Route, NavLink } from "react-router-dom";
import dummydata from "./dummydata";
import QuizList from "./components/Quiz/QuizList";
import PostList from "./components/Post/PostList";

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
          path="/quizzes"
          render={props => <QuizList {...props} quizzes={dummydata} />}
        />
        {/* <Route
          path="/quizzes/:id"
          render={props => <QuizView {...props} quizzes={dummydata} />}
        /> */}
        <Route exact path="/posts" render={props => <PostList {...props} />} />
      </div>
    );
  }
}

export default withRouter(App);
