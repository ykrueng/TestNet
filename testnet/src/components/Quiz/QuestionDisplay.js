import React from "react";
import { Form, Header, Icon } from "semantic-ui-react";
import VoicePlayer from "../VoiceLibrary/VoicePlayer";

const QuestionDisplay = ({ play, playVoice, stopVoice, question, change, current, questionId }) => {
  return (
    <Form style={{ padding: "1rem 0" }}>
      {play && (
        <VoicePlayer
          play
          onEnd={stopVoice}
          text={`${question.question} ${question.options.join(". ")}`}
        />
      )}
      <Header as="h3" style={{ margin: "2.5rem 0" }}>
        <Icon style={{ cursor: "pointer" }} onClick={playVoice} className="volume up" />
        {` ${question.question}`}
      </Header>
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
