import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class LoginForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    img_url: "",
    loginForm: true,
  };

  handleFormSwitch = () => {
    console.log('clicked')
    this.setState( state => ({ loginForm: !state.loginForm }))
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    if (this.state.loginForm) {
      this.props.login(user);
    } else {
      user.username = this.state.username;
      if (this.state.img_url) {
        user.img_url = this.state.img_url;
      }
      this.props.register(user);
    }

  }

  render() {
    const { email, username, password, img_url, loginForm } = this.state;
    const { loginError, registrationError } = this.props;
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
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              {loginForm ? "Sign In to TestNet" : "Sign Up to TestNet"}
            </Header>
            <Form action="submit" onSubmit={this.handleSubmit} size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="mail"
                  name="email"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={email}
                  onChange={this.handleChange}
                />
                {
                  !loginForm &&
                  <Form.Input
                    fluid
                    icon="user"
                    name="username"
                    iconPosition="left"
                    placeholder="Username"
                    value={username}
                    onChange={this.handleChange}
                  />
                }
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                {
                  !loginForm &&
                  <Form.Input
                    fluid
                    icon="user secret"
                    name="img_url"
                    iconPosition="left"
                    placeholder="Optional image url"
                    value={img_url}
                    onChange={this.handleChange}
                  />
                }
                <Button
                  color="teal"
                  fluid
                  size="large"
                  type="submit"
                >
                  { loginForm ? "Sign In" : "Sign Up"}
                </Button>
              </Segment>
            </Form>
            {
              loginError &&
              <Message>
                ** Login failed, please check your username and password
              </Message>
            }
            {
              this.props.registrationError &&
              <Message>
                ** Registration failed, please try again
              </Message>
            }
            <Message>
              { loginForm ? "New to us? " : "Already have an account? "} 
              <Button onClick={this.handleFormSwitch}>
                { loginForm ? "Sign Up" : "Sign In"}
              </Button>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
