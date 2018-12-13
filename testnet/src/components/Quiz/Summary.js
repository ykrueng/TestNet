import React from "react";
import { Header, Form, Grid } from "semantic-ui-react";

const Summary = ({ questions, answers, rubric }) => {
  console.log(rubric, questions, answers);
  if (rubric) {
    return (
      <Grid.Column style={{ margin: "0 auto" }}>
        {questions.map((q, index) => (
          <Header key={index}>
            {q.question}
            <Header
              color={rubric[index].correct === true ? "green" : "red"}
              content={rubric[index].correct === true ? "Correct" : "Incorrect"}
            />
          </Header>
        ))}
      </Grid.Column>
    );
  }

  return questions.map((q, index) => {
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
  });
};

export default Summary;
