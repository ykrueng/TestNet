import React from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import QuizView from "./views/QuizView";
import PostList from "./components/Post/PostList";
import DummyView from "./views/DummyView";
import { login, register } from "./store/actions";

class App extends React.Component {
  render() {
    return (
      <div>
        <QuizView {...this.props} />

        <Route exact path="/dummy" render={props => <DummyView {...props} />} />
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
