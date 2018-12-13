import React, { Fragment } from "react";
import { Button, Progress } from "semantic-ui-react";

const NextButton = ({ checking, next, progress }) => {
  return (
    <Fragment>
      <Button
        basic
        attached="bottom"
        color="blue"
        disabled={checking ? true : false}
        content={`Submit & Continue`}
        onClick={() => next()}
        style={{ margin: "1.5rem 0" }}
      />
      <Progress
        percent={progress}
        color="green"
        label="Percent Completed"
        size="tiny"
      />
    </Fragment>
  );
};

export default NextButton;
