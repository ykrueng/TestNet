import React from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import QuizView from "./views/QuizView";
import PostView from "./views/PostView";
import DummyView from "./views/DummyView";
import LoginForm from "./components/Login";
import { login, register, checkStatus } from "./store/actions";

class App extends React.Component {
  componentDidMount() {
    this.props.checkStatus();
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };

  render() {
    if (!this.props.loggedIn) {
      return (
        <LoginForm
          login={this.props.login}
          register={this.props.register}
          loginError={this.props.loginError}
        />
      );
    }
    return (
      <div>
        <QuizView {...this.props} click={this.handleClick} />

        <Route exact path="/dummy" render={props => <DummyView {...props} />} />
        <Route exact path="/posts" render={props => <PostView {...props} />} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      loggedIn: state.loginReducer.loggedIn,
      loginError: state.loginReducer.loginError,
      registrationError: state.loginReducer.registrationError
    }),
    { login, register, checkStatus }
  )(App)
);
