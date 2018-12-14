import React from "react";
import { Header, Grid } from "semantic-ui-react";

const QuizList = props => {
  const { quizzes, history } = props;
  return (
    <Grid centered container fluid columns={2} relaxed padded="vertically">
      {quizzes.map(quiz => (
        <Grid.Column
          key={quiz.id}
          verticalAlign="top"
          style={{ padding: "1rem 0" }}
          onClick={() => history.push(`/quizzes/${quiz.id}`)}
        >
          <Grid.Row stretched={true}>
            <Header
              as="h1"
              color="teal"
              attached="bottom"
              content={quiz.title}
              subheader={`submitted by ${quiz.author}`}
            />
          </Grid.Row>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default QuizList;
