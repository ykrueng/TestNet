import React from "react";
import PropTypes from "prop-types";
import {
  Segment,
  Image,
  Header,
  Form,
  Button,
  Divider
} from "semantic-ui-react";

class UserDetail extends React.Component {
  state = {
    update: false,
    updateUsername: false
  };

  /*
    Args: type - true to update username
               - false to update password
               - null to cancel update
  */
  handleChangeClick = type => {
    this.setState({
      update: type === null ? false : true,
      updateUsername: type
    });
  };

  render() {
    const { loggedIn, user } = this.props;
    const { update, updateUsername } = this.state;
    const display = !loggedIn ? (
      <Segment
        textAlign="center"
        style={{
          margin: "2rem auto",
          maxWidth: "60rem"
        }}
      >
        You're Not Signed In
      </Segment>
    ) : (
      <Segment
        style={{
          margin: "2rem auto",
          maxWidth: "60rem"
        }}
      >
        <Image
          centered
          src={
            user && user.url
              ? user.url
              : "https://react.semantic-ui.com/images/wireframe/square-image.png"
          }
          size="small"
          circular
        />
        <Segment
          textAlign="center"
          style={{ border: "none", boxShadow: "none" }}
        >
          <Header as="h1">{user.username}</Header>
          <Button
            color="teal"
            onClick={() => this.handleChangeClick(true)}
            icon="edit"
            content="Change Username"
          />
          <Button
            color="teal"
            onClick={() => this.handleChangeClick(false)}
            icon="edit"
            content="Change Password"
          />
        </Segment>
        <Divider />

        {update && (
          <Form
            widths="equal"
            style={{
              maxWidth: "50rem",
              margin: "2rem auto"
            }}
          >
            <Form.Group>
              <Form.Input
                required
                label={updateUsername ? "New Username" : "New Password"}
              />
              <Form.Input required label="Password" />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Form.Button
                icon="cancel"
                content="Cancel"
                onClick={() => this.handleChangeClick(null)}
              />
              <Form.Button
                color="teal"
                icon="save"
                content="Change"
                type="submit"
              />
            </div>
          </Form>
        )}
      </Segment>
    );

    return display;
  }
}

export default UserDetail;

UserDetail.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.url,
    username: PropTypes.string
  })
};
