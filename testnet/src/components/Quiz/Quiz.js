import React from "react";
import { Header, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getQuizz, getQuestions } from "../../store/actions/quizzActions";

class Quiz extends React.Component {
  componentDidMount() {
    this.props.getQuizz(this.props.match.params.id);
  }
  render() {
    const id = this.props.match.params.id;
    const { quizz } = this.props;

    return (
      <div className="quiz">
        <Header as="h3">
          {quizz.title}
          <Header.Subheader content={quizz.topic} />
          <Header.Subheader
            content={quizz.author ? quizz.author.username : "Loading"}
          />
          <Header.Subheader content={quizz.votes} />
        </Header>

        <Button
          content="Begin Quiz"
          basic
          color="black"
          onClick={() => this.props.history.push(`/quizzes/${id}/1`)}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { quizzReducer } = state;
  return {
    quizz: quizzReducer.quizz,
    questions: quizzReducer.questions
  };
};

export default connect(
  mapStateToProps,
  { getQuizz, getQuestions }
)(Quiz);
