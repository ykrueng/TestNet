import React from "react";
import { Header, Form } from "semantic-ui-react";

const Summary = ({ questions, answers, rubric }) => {
  console.log(rubric, questions, answers);
  if (rubric) {
    return (
      <div>
        {questions.map((q, index) => (
          <Header key={index}>
            {q.question}
            <Header.Subheader
              content={rubric[index].correct === true ? "Correct" : "Incorrect"}
            />
          </Header>
        ))}
      </div>
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
