import React, { Component } from "react";
import { connect } from "react-redux";

import { updateUser } from "../store/actions";
import UserDetail from "../components/User/UserDetail";

class UserView extends Component {
  state = {};
  render() {
    const { loggedIn, user, updateUser, token, history } = this.props;

    return (
      <UserDetail
        history={history}
        loggedIn={loggedIn}
        updateUser={updateUser}
        user={user}
        token={token}
      />
    );
  }
}

export default connect(
  ({ loginReducer }) => ({
    loggedIn: loginReducer.loggedIn,
    user: loginReducer.user,
    token: loginReducer.token
  }),
  { updateUser }
)(UserView);
