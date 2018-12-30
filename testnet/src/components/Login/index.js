import React from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

class LoginForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    img_url: "",
    loginForm: true
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, username, password, img_url } = this.state;
    const { login, register, signin } = this.props;

    const user = { email, password };
    if (signin) {
      login(user);
    } else {
      user.username = username;
      if (img_url) {
        user.img_url = img_url;
      }
      register(user);
    }
  };

  render() {
    const { email, username, password, img_url } = this.state;
    const { signin, loginError, registrationError, toggleAuthForm } = this.props;
    return (
      <div className="login-form">
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              {signin ? "Sign In to TestNet" : "Sign Up to TestNet"}
            </Header>
            <Form action="submit" onSubmit={this.handleSubmit} size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  required
                  icon="mail"
                  name="email"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={email}
                  onChange={this.handleChange}
                />
                {!signin && (
                  <Form.Input
                    fluid
                    required
                    icon="user"
                    name="username"
                    iconPosition="left"
                    placeholder="Username"
                    value={username}
                    onChange={this.handleChange}
                  />
                )}
                <Form.Input
                  fluid
                  required
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                {!signin && (
                  <Form.Input
                    fluid
                    icon="user secret"
                    name="img_url"
                    iconPosition="left"
                    placeholder="Optional image url"
                    value={img_url}
                    onChange={this.handleChange}
                  />
                )}
                <Button
                  color="teal"
                  size="large"
                  type="submit"
                  content={signin ? "Sign In" : "Sign Up"}
                  icon={signin ? "sign in" : "add user"}
                />
                <Button
                  icon="cancel"
                  content="Cancel"
                  color="grey"
                  size="large"
                  onClick={() => toggleAuthForm("cancel")}
                />
              </Segment>
            </Form>
            {loginError && (
              <Message>** Login failed, please check your username and password</Message>
            )}
            {registrationError && <Message>** Registration failed, please try again</Message>}
            <Message>
              {signin ? "New to TestNet? " : "Already have an account? "}
              <Button
                inverted
                secondary
                onClick={() => {
                  const type = signin ? "signup" : "signin";
                  toggleAuthForm(type);
                }}
                content={signin ? "Sign Up" : "Sign In"}
                icon={signin ? "add user" : "sign in"}
              />
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  signin: PropTypes.bool.isRequired,
  toggleAuthForm: PropTypes.func.isRequired,
  loginError: PropTypes.bool,
  registrationError: PropTypes.bool
};
