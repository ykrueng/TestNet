import React from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import QuizView from "./views/QuizView";
import PostView from "./views/PostView";
import DummyView from "./views/DummyView";
import LoginForm from "./components/Login";
import { login, register } from "./store/actions";

class App extends React.Component {
  state = {
    modal: false
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };

  render() {
    if (this.state.modal) {
      return <LoginForm click={this.handleClick} />;
    }
    return (
      <div>
        <QuizView {...this.props} click={this.handleClick} />
        {/* {this.state.modal && <LoginForm click={this.handleClick} />} */}

        <Route exact path="/dummy" render={props => <DummyView {...props} />} />
        <Route exact path="/posts" render={props => <PostView {...props} />} />
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
