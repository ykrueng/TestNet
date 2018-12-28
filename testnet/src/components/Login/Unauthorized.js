import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import PropTypes from 'prop-types';

const Unauthorized = ({ headerText="", cancelText="", onCancel, onSubmit }) => {
  return (
    <Segment
      style={{
        maxWidth: "60rem",
        margin: "2rem auto"
      }}
      textAlign="center"
    >
      <Header as="h2">{headerText || "Back to Home"}</Header>
      <Button
        onClick={onCancel}
        icon="arrow left"
        content={cancelText || "Cancel"}
      />
      {
        onSubmit &&
        <Button
          color="teal"
          onClick={onSubmit}
          icon="sign in"
          content="Sign In"
        />
      }
    </Segment>
  );
};

export default Unauthorized;

Unauthorized.proptypes = {
  headerText: PropTypes.string,
  cancelText: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
}