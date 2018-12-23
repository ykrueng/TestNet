import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import QuizView from "./views/QuizView";
import LoginForm from "./components/Login";
import PostRoutes from "./components/Post/routes";
import { login, register, checkStatus } from "./store/actions";

const user = JSON.parse(localStorage.getItem("testnet-user"));

class App extends React.Component {
  state = {
    modal: false,
    signin: true
  };

  // Check local storage for previous login info
  componentDidMount() {
    this.props.checkStatus();
  }

  // Hide modal when Login / Register succeed
  componentWillReceiveProps(props) {
    props.loggedIn && this.setState({ modal: false });
  }

  handleClick = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleFormSwitch = () => {
    this.setState({ signin: !this.state.signin });
  };

  getRegistrationFrom = () => {
    this.setState({ signin: false, modal: true });
  };

  render() {
    const { login, register, loginError, registrationError } = this.props;
    if (this.state.modal) {
      return (
        <LoginForm
          login={login}
          register={register}
          signin={this.state.signin}
          handleFormSwitch={this.handleFormSwitch}
          handleCancel={this.handleClick}
          loginError={loginError}
          registrationError={registrationError}
        />
      );
    }
    return (
      <div>
        <QuizView
          {...this.props}
          click={this.handleClick}
//          user={user}
          getRegistrationFrom={this.getRegistrationFrom}
        />

        <PostRoutes user={user} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    ({ loginReducer }) => ({
      loggedIn: loginReducer.loggedIn,
      loginError: loginReducer.loginError,
      registrationError: loginReducer.registrationError
    }),
    { login, register, checkStatus }
  )(App)
);
