import React from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";

const Review = props => {
  const { questions, answers, rubric } = props;
  // console.group("q&a");
  // console.log(questions);
  // console.log(answers);
  // console.log(rubric);
  // console.groupEnd();
  let result = [];
  for (let i = 0; i < rubric.length; i++) {
    result.push(answers.find(item => item.question === questions[i].question));
  }
  console.log(props);
  console.log(result);
  const { id } = props.match.params;
  return (
    <Grid centered columns={3} style={{ marginTop: "5rem" }}>
      <Grid.Column>
        <Form>
          {questions.map((q, index) => {
            return (
              <Header key={index} style={{ marginBottom: "3rem" }}>
                {`${index + 1}. ${q.question}`}
                <Form.Group style={{ marginTop: "2rem" }}>
                  {q.options.map((ans, i) => (
                    <Form.Radio
                      key={i}
                      label={ans}
                      checked={ans === answers[index] ? true : false}
                    />
                  ))}
                </Form.Group>
              </Header>
            );
          })}

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
