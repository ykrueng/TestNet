import React from "react";
import Overview from "./Overview";
import { Button, Form, Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

const Review = props => {
  const { questions, answers, rubric } = props;
  const { id } = props.match.params;
  if (answers.length < 1) {
    return <Redirect to="/quizzes" />;
  }
  return (
    <Grid centered columns={3} style={{ marginTop: "5rem" }}>
      <Grid.Column>
        <Form>
          <Overview questions={questions} answers={answers} />
          <Button inverted color="green" content="Submit" attached="bottom" />
          <Button
            inverted
            attached="bottom"
            color="red"
            content="Restart"
            onClick={() => props.history.push(`/quizzes/${id}`)}
            style={{ marginTop: "1rem" }}
          />
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Review;
