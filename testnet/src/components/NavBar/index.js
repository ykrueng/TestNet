import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Input } from "semantic-ui-react";

class NavBar extends React.Component {
  state = {
    active: "home"
  };
  handleChange = e => {
    this.setState({ active: e.target.name });
  };

  render() {
    const { active } = this.state;
    return (
      <Menu secondary>
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
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;
