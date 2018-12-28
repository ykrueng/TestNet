import React from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import { login, register, checkStatus, toggleAuthForm } from "./store/actions";

import QuizView from "./views/QuizView";
import LoginForm from "./components/Login";
import PostRoutes from "./components/Post/routes";
import UserView from "./views/UserView";

class App extends React.Component {

  // Check local storage for previous login info
  componentDidMount() {
    this.props.checkStatus();
  }

  render() {
    const { user, login, register, loginError, registrationError } = this.props;
    if (this.props.modal) {
      return (
        <LoginForm
          login={login}
          register={register}
          signin={this.props.signInModal}
          loginError={loginError}
          registrationError={registrationError}
          toggleAuthForm={this.props.toggleAuthForm}
        />
      );
    }

    return (
      <div>
        <QuizView {...this.props} />

        <PostRoutes user={user} />

        <Route exact path="/user"
          render={props => (<UserView {...props} />)} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    ({ loginReducer }) => ({
      modal: loginReducer.modal,
      signInModal: loginReducer.signInModal, 
      user: loginReducer.user,
      loggedIn: loginReducer.loggedIn,
      loginError: loginReducer.loginError,
      registrationError: loginReducer.registrationError
    }),
    { login, register, checkStatus, toggleAuthForm }
  )(App)
);
