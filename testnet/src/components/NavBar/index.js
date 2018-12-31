import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Segment, Button, Dropdown, Confirm } from "semantic-ui-react";
import PropTypes from "prop-types";

class NavBar extends React.Component {
  state = {
    active: "",
    confirmation: false
  };

  handleChange = ({ target: { name } }) => {
    this.setState({ active: name });
  };

  handleClick = () => {
    const { loggedIn, toggleAuthForm } = this.props;

    if (loggedIn) {
      this.setState({ confirmation: true });
    } else {
      toggleAuthForm("signin");
    }
  };

  render() {
    const { active, confirmation } = this.state;
    const { loggedIn, user, history, toggleAuthForm, logout } = this.props;
    return (
      <Segment>
        <Menu borderless inverted fixed="top">
          <Menu.Menu position="left">
            <Menu.Item
              name="home"
              as={NavLink}
              exact
              to="/"
              active={active === "home"}
              color="teal"
              onClick={this.handleChange}
            />
            <Menu.Item
              name="quizzes"
              as={NavLink}
              to="/quizzes"
              active={active === "quizzes"}
              color="teal"
              onClick={this.handleChange}
            />
            <Menu.Item
              name="forum"
              as={NavLink}
              to="/forum"
              active={active === "posts"}
              color="teal"
              onClick={this.handleChange}
            />
          </Menu.Menu>

          <Menu.Menu position="right">
            <Menu.Item>
              {loggedIn && (
                <Dropdown text={user.username} icon="user" floating labeled button className="icon">
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => history.push("/user")}
                      value="setting"
                      icon="setting"
                      text="Account Settings"
                    />
                    <Dropdown.Item disabled value="quiz" icon="edit outline" text="Quizzes" />
                    <Dropdown.Item disabled values="post" icon="edit outline" text="Posts" />
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Button
                inverted
                color="teal"
                style={{ marginLeft: "1rem", marginRight: "1rem" }}
                icon={loggedIn ? "sign out" : "sign in"}
                content={loggedIn ? "Sign Out" : "Sign In"}
                onClick={this.handleClick}
              />
              {!loggedIn && (
                <Button
                  inverted
                  primary
                  icon="add user"
                  content="Sign Up!"
                  style={{ marginLeft: ".75rem" }}
                  onClick={() => toggleAuthForm("signup")}
                />
              )}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Confirm
          open={confirmation}
          content={`Are you sure you want to sign out?`}
          onCancel={() => this.setState({ confirmation: false })}
          onConfirm={() => {
            logout();
            this.setState({ confirmation: false });
          }}
        />
      </Segment>
    );
  }
}

export default NavBar;

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }).isRequired,
  toggleAuthForm: PropTypes.func.isRequired
};
