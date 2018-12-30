import React, { Fragment } from "react";
import { Button, Progress } from "semantic-ui-react";

const NextButton = ({ checking, next, progress, quizId, questionId }) => {
  return (
    <Fragment>
      <Button
        basic
        attached="bottom"
        color="blue"
        disabled={checking}
        content={`Submit & Continue`}
        onClick={() => next(quizId, questionId)}
        style={{ margin: "1.5rem 0" }}
      />
      <Progress percent={progress} color="green" label="Percent Completed" size="tiny" />
    </Fragment>
  );
};

export default NextButton;
