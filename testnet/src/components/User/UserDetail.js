import React from "react";
import PropTypes from "prop-types";
import { Segment, Image, Header, Form, Button, Divider, Confirm } from "semantic-ui-react";

import Unauthorized from "../Login/Unauthorized";

class UserDetail extends React.Component {
  state = {
    update: false,
    updateUsername: false,
    password: "",
    value: "",
    confirmation: false
  };

  /*
    Args: type - true to update username
               - false to update password
               - null to cancel update
  */
  handleChangeClick = type => {
    this.setState({
      update: type === null ? false : true,
      updateUsername: type,
      password: "",
      value: "",
      confirmation: false
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleUpdate = () => {
    const user = { currentPassword: this.state.password };

    if (this.state.updateUsername) {
      user.newUsername = this.state.value;
    } else {
      user.newPassword = this.state.value;
    }

    this.props.updateUser(user, this.props.token);
    this.setState({
      password: "",
      value: "",
      confirmation: false
    });

    // TODO: confirm if update success/fail
  };

  render() {
    const { loggedIn, user, history } = this.props;
    const { update, updateUsername, value, password, confirmation } = this.state;

    // user not logged in
    if (!loggedIn)
      return (
        <Unauthorized
          onCancel={() => history.push("/quizzes")}
          headerText="Sign in to access Setting"
          cancelText="Back to Quiz List"
        />
      );

    // user logged in
    return (
      <Segment style={{ margin: "2rem auto", maxWidth: "60rem" }}>
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
        <Segment textAlign="center" style={{ border: "none", boxShadow: "none" }}>
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
            style={{ maxWidth: "50rem", margin: "2rem auto" }}
            onSubmit={() => this.setState({ confirmation: true })}
          >
            <Form.Group>
              <Form.Input
                required
                name="value"
                type={updateUsername ? "text" : "password"}
                value={value}
                onChange={this.handleChange}
                label={updateUsername ? "New Username" : "New Password"}
              />
              <Form.Input
                name="password"
                value={password}
                onChange={this.handleChange}
                required
                type="password"
                label="Password"
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Form.Button
                icon="cancel"
                content="Cancel"
                onClick={() => this.handleChangeClick(null)}
              />
              <Form.Button color="teal" icon="save" content="Change" type="submit" />
            </div>
          </Form>
        )}
        <Confirm
          open={confirmation}
          content={`Are you sure you want to update your ${
            updateUsername ? "username" : "password"
          }?`}
          onCancel={() => this.handleChangeClick(null)}
          onConfirm={this.handleUpdate}
        />
      </Segment>
    );
  }
}

export default UserDetail;

UserDetail.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.url,
    username: PropTypes.string
  }),
  token: PropTypes.string,
  updateUser: PropTypes.func.isRequired
};
