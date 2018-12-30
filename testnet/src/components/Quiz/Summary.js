import React from "react";
import { Header, Form, Grid } from "semantic-ui-react";

import ResultForm from "./ResultForm";
import Unauthorized from "../Login/Unauthorized";

const Summary = ({ questions, answers, rubric, auth, quizId, history }) => {
  if (rubric) {
    const score = rubric.filter(item => item.correct).length;
    return (
      <Grid.Column style={{ margin: "0 auto" }}>
        <Header as="h1" content="Your Result:" />
        {questions.map((q, i) => (
          <Header key={i}>
            {q.question}
            <Header
              as="h3"
              color={rubric[i].correct ? "green" : "red"}
              content={rubric[i].correct ? "Correct" : "Incorrect"}
            />
          </Header>
        ))}
        <Header
          textAlign="center"
          content={`Total Score: ${rubric.filter(item => item.correct).length} / ${rubric.length}`}
          // SHOW CORRECT ANSWERS LENGTH / RUBRIC ARRAY LENGTH
        />

        {!auth && (
          <Unauthorized
            headerText="Sign In to Save Future Score"
            cancelText="Back to Quiz List"
            onCancel={() => history.push("/quizzes")}
          />
        )}
        {auth && (
          <Header block>
            <ResultForm score={score} id={quizId} />
          </Header>
        )}
      </Grid.Column>
    );
  }

  return questions.map((q, index) => {
    return (
      <Header key={index} style={{ marginBottom: "3rem" }}>
        {`${index + 1}. ${q.question}`}
        <Form.Group style={{ marginTop: "2rem" }}>
          {q.options.map((ans, i) => (
            <Form.Radio key={i} label={ans} checked={ans === answers[index] ? true : false} />
          ))}
        </Form.Group>
      </Header>
    );
  });
};

export default Summary;
