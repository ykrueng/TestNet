import React from "react";
import Summary from "./Summary";
import { Button, Form, Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getQuestions } from "../../store/actions/quizzActions";

class Review extends React.PureComponent {
  state = {
    reveal: false
  };

  reveal = e => {
    e.preventDefault();
    this.setState({ reveal: !this.state.reveal });
  };

  render() {
    const { questions, answers, rubric, history, quizId, token } = this.props;
    if (answers.length < 1) {
      return <Redirect to={`/quizzes/${quizId}/`} />;
    }
    if (this.state.reveal) {
      return (
        <Grid centered columns={3} style={{ marginTop: "5rem" }}>
          <Summary
            history={history}
            auth={token}
            questions={questions}
            answer={answers}
            rubric={rubric}
            quizId={quizId}
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
              onClick={() => history.push(`/quizzes/${quizId}`)}
              style={{ marginTop: "1rem" }}
            />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  ({ loginReducer, quizzReducer }) => ({
    token: loginReducer.token,
    questions: quizzReducer.questions
  }),
  { getQuestions }
)(Review);
