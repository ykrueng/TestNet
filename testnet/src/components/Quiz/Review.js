import React from "react";
import Summary from "./Summary";
import { Button, Form, Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Review extends React.Component {
  state = {
    reveal: false
  };

  reveal = e => {
    e.preventDefault();
    this.setState({ reveal: !this.state.reveal });
  };

  render() {
    const { questions, answers, rubric, history, match, token } = this.props;
    if (answers.length < 1) {
      return <Redirect to="/quizzes" />;
    }
    if (this.state.reveal) {
      return (
        <Grid centered columns={3} style={{ marginTop: "5rem" }}>
          <Summary
            auth={token}
            questions={questions}
            answer={answers}
            rubric={rubric}
            match={match}
          />
        </Grid>
      );
    }

    return (
      <Grid centered columns={3} style={{ marginTop: "5rem" }}>
        <Grid.Column>
          <Form>
            <Summary questions={questions} answers={answers} />
            <Button
              inverted
              color="green"
              content="Submit"
              attached="bottom"
              onClick={e => this.reveal(e)}
            />
            <Button
              inverted
              attached="bottom"
              color="red"
              content="Restart"
              onClick={() => history.push(`/quizzes/${match.params.id}`)}
              style={{ marginTop: "1rem" }}
            />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { loginReducer } = state;
  return {
    token: loginReducer.token
  };
};
export default connect(mapStateToProps)(Review);
