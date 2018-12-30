import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

import { toggleAuthForm } from "../../store/actions";

const SignInButton = ({ text = "Sign In", toggleAuthForm }) => {
  return (
    <Button color="teal" onClick={() => toggleAuthForm("signin")} icon="sign in" content={text} />
  );
};

export default connect(
  state => ({}),
  { toggleAuthForm }
)(SignInButton);

SignInButton.propTypes = {
  text: PropTypes.string
};
