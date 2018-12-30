import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import SignInButton from "./SignInButton";

const Unauthorized = ({ headerText = "", cancelText = "", onCancel, submit = true }) => {
  return (
    <Segment
      style={{
        maxWidth: "60rem",
        margin: "2rem auto"
      }}
      textAlign="center"
    >
      <Header as="h2">{headerText || "Unauthorized Request"}</Header>
      <Button onClick={onCancel} icon="arrow left" content={cancelText || "Cancel"} />
      {submit && <SignInButton />}
    </Segment>
  );
};

export default Unauthorized;

Unauthorized.proptypes = {
  headerText: PropTypes.string,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  submit: PropTypes.bool
};
