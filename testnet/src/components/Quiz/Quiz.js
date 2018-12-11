import React from "react";
import { Header, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getQuizzes } from "../../store/actions/quizzActions";

class Quiz extends React.Component {
  componentDidMount() {
    this.props.getQuizzes();
  }
  render() {
    const title = this.props.match.params.title;
    const quiz = this.props.quizzes.find(quiz => quiz.title === title);
    return (
      <div className="quiz">
        <Header as="h3">
          {quiz.title}
          <Header.Subheader content={quiz.author} />
        </Header>

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
const mapStateToProps = state => {
  const { quizzReducer } = state;
  return {
    quizzes: quizzReducer.quizzes
  };
};

export default connect(
  mapStateToProps,
  { getQuizzes }
)(Quiz);
