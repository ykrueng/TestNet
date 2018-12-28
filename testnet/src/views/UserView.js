import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import UserDetail from '../components/User/UserDetail';

class UserView extends Component {
  state = {  }
  render() {
    const { loggedIn, user } = this.props;

    return (
      <>
        <Route exact path="/user" render={props => (
          <UserDetail {...props} loggedIn={loggedIn} user={user} />
        )}/>
      </>
    );
  }
}
 
export default connect(
  state => ({
    loggedIn: state.loginReducer.loggedIn,
    user: state.loginReducer.user,
  }),
  {

  }
)(UserView);