import React from "react";
import { Form, Header } from "semantic-ui-react";

const QuestionDisplay = ({ question, change, current, questionId }) => {
  return (
    <Form style={{ padding: "1rem 0" }}>
      <Header as="h3" style={{ margin: "2.5rem 0" }}>{` ${
        question.question
      }`}</Header>
      {question.options.map((ans, index) => (
        <Form.Radio
          key={index}
          label={ans}
          value={ans}
          onChange={() => change(index, ans, question.quiz_id, questionId)}
          checked={current === ans}
        />
      ))}
    </Form>
  );
};

export default QuestionDisplay;
