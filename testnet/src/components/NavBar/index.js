import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Segment, Button, Dropdown } from "semantic-ui-react";
import PropTypes from 'prop-types';

class NavBar extends React.Component {
  state = {
    active: "home"
  };

  handleChange = ({ target: { name } }) => {
    this.setState({ active: name });
  };

  handleClick = () => {
    const { loggedIn, logout, toggleAuthForm } = this.props;

    if (loggedIn) {
      logout();
    } else {
      toggleAuthForm("signin");
    }
  };

  render() {
    const { active } = this.state;
    const { loggedIn, user, history, toggleAuthForm } = this.props;
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
                <Dropdown
                  text={user.username}
                  icon="user"
                  floating
                  labeled
                  button
                  className="icon"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => history.push("/user")}
                      value="setting"
                      icon="setting"
                      text="Account Settings"
                    />
                    <Dropdown.Item
                      disabled
                      value="quiz"
                      icon="edit outline"
                      text="Quizzes"
                    />
                    <Dropdown.Item
                      disabled
                      values="post"
                      icon="edit outline"
                      text="Posts"
                    />
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Button
                primary
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
      </Segment>
    );
  }
}

export default NavBar;

NavBar.propTypes = {
  logout:PropTypes.func.isRequired,
  loggedIn:PropTypes.bool.isRequired,
  history:PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
  }).isRequired,
  toggleAuthForm:PropTypes.func.isRequired,
}
