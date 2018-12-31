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
          text={`${question.question} ${question.options.map(option => option[1]).join(". ")}`}
        />
      )}
      <Header as="h3" style={{ margin: "2.5rem 0" }}>
        <Icon style={{ cursor: "pointer" }} onClick={playVoice} className="volume up" />
        {` ${question.question}`}
      </Header>
      {question.options.map((option) => (
        <Form.Radio
          key={option[0]}
          label={option[1]}
          value={option[1]}
          onChange={() => change(option[0], option[1], question.quiz_id, questionId)}
          checked={current === option[1]}
        />
      ))}
    </Form>
  );
};

export default QuestionDisplay;
