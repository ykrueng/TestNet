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
    const { loggedIn, getRegistrationFrom } = this.props;
    return (
      <Segment style={{ padding: "1.5rem 0" }}>
        <Menu pointing borderless fixed="top" fluid inverted>
          <Menu.Menu position="left">
            <Menu.Item
              name="home"
              as={NavLink}
              exact
              to="/"
              active={active === "home"}
              onClick={this.handleChange}
            />
            <Menu.Item
              name="quizzes"
              as={NavLink}
              to="/quizzes"
              active={active === "quizzes"}
              onClick={this.handleChange}
            />
            <Menu.Item
              name="forum"
              as={NavLink}
              to="/forum"
              active={active === "posts"}
              onClick={this.handleChange}
            />
          </Menu.Menu>

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
