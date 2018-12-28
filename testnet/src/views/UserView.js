import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateUser } from '../store/actions';

import UserDetail from '../components/User/UserDetail';

class UserView extends Component {
  state = {  }
  render() {
    const { loggedIn, user, updateUser, token } = this.props;

    return (
      <>
        <Route exact path="/user" render={props => (
          <UserDetail {...props} loggedIn={loggedIn} updateUser={updateUser} user={user} token={token} />
        )}/>
      </>
    );
  }
}
 
export default connect(
  state => ({
    loggedIn: state.loginReducer.loggedIn,
    user: state.loginReducer.user,
    token: state.loginReducer.token,
  }),
  {
    updateUser,
  }
)(UserView);