import React from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";

const Review = props => {
  const { questions, answers, rubric } = props;
  // console.group("q&a");
  // console.log(questions);
  // console.log(answers);
  // console.log(rubric);
  // console.groupEnd();
  return (
    <Grid centered columns={5}>
      <Grid.Column width={4}>
        <Form>
          {answers.map((pair, index) => {
            return (
              <Header key={index}>
                {`${index + 1}. ${pair.question}`}
                <Form.Radio label={pair.answer} checked={true} />
              </Header>
            );
          })}
          <Button.Group />
          <Button color="green" content="Submit" floated="left" />
          <Button color="red" content="Restart" floated="right" />
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Review;
