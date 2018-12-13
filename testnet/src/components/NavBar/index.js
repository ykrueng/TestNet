import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Segment, Button } from "semantic-ui-react";

class NavBar extends React.Component {
  state = {
    active: "home"
  };

  handleChange = e => {
    this.setState({ active: e.target.name });
  };

  handleClick = e => {
    const { loggedIn, click, logout } = this.props;

    if (loggedIn) {
      logout();
    } else {
      click();
    }
    
  }

  render() {
    const { active } = this.state;
    const { loggedIn, getRegistrationFrom } = this.props;
    return (
      <Segment style={{ padding: "1.5rem 0" }}>
        <Menu pointing={true} size="large" fixed="top" inverted>
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
              name="posts"
              as={NavLink}
              to="/posts"
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
              {
                !loggedIn && 
                <Button inverted primary style={{ marginLeft: ".75rem" }}
                  onClick={getRegistrationFrom}
                >
                  Sign Up!
                </Button>
              }
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

export default NavBar;
