import React from "react";
import { Header, Button } from "semantic-ui-react";

class Quiz extends React.Component {
  render() {
    const title = this.props.match.params.title;
    const quiz = this.props.quizzes.find(quiz => quiz.title === title);
    return (
      <div className="quiz">
        <Header as="h2">{quiz.title}</Header>
        <Button
          content="Begin Quiz"
          basic
          color="black"
          onClick={() => this.props.history.push(`/quizzes/${title}/1`)}
        />
      </div>
    );
  }
}

export default Quiz;
