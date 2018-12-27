import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Segment, Button } from "semantic-ui-react";

class NavBar extends React.Component {
  state = {
    active: "home"
  };

  handleChange = ({ target: { name } }) => {
    this.setState({ active: name });
  };

  handleClick = () => {
    const { loggedIn, click, logout } = this.props;

    if (loggedIn) {
      logout();
    } else {
      click();
    }
  };

  render() {
    const { active } = this.state;
    const { loggedIn, getRegistrationFrom, user } = this.props;
    return (
      <Segment style={{ padding: "1rem 0" }}>
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

          {user && user.username && (
            <div
              position="right"
              style={{
                display: "flex",
                color: "white",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%"
              }}
            >
              Logged in as: {user.username}
            </div>
          )}

          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                primary
                content={loggedIn ? "Logout" : "Login"}
                onClick={this.handleClick}
              />
              {!loggedIn && (
                <Button
                  inverted
                  primary
                  style={{ marginLeft: ".75rem" }}
                  onClick={getRegistrationFrom}
                >
                  Sign Up!
                </Button>
              )}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

export default NavBar;
