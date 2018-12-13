import React from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import QuizView from "./views/QuizView";
import PostView from "./views/PostView";
import DummyView from "./views/DummyView";
import LoginForm from "./components/Login";
import { login, register, checkStatus } from "./store/actions";

class App extends React.Component {
  state = {
    modal: false,
    signin: true,
  }

  componentDidMount() {
    this.props.checkStatus();
  }

  componentWillReceiveProps(props) {
    props.loggedIn && this.setState({modal: false})
  }

  handleClick = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleFormSwitch = () => {
    this.setState({ signin: !this.state.signin })
  }

  getRegistrationFrom = () => {
    this.setState({ signin: false, modal: true })
  }

  render() {
    if (this.state.modal) {
      return <LoginForm
        login={this.props.login}
        register={this.props.register}
        signin={this.state.signin}
        handleFormSwitch={this.handleFormSwitch}
        loginError={this.props.loginError}
        registrationError={this.props.registrationError}
      />;
    }
    return (
      <div>
        <QuizView {...this.props}
          click={this.handleClick}
          getRegistrationFrom={this.getRegistrationFrom}
        />
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
      loggedIn: state.loginReducer.loggedIn,
      loginError: state.loginReducer.loginError,
      registrationError: state.loginReducer.registrationError
    }),
    { login, register, checkStatus }
  )(App)
);
