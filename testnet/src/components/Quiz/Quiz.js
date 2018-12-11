import React from "react";
import { Header, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getQuizz, getQuestions } from "../../store/actions/quizzActions";

class Quiz extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getQuizz(id);
    this.props.getQuestions(id);
  }
  render() {
    const id = this.props.match.params.id;
    const { quizz } = this.props;
    console.log(this.props.questions);

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
          onClick={() => this.props.history.push(`/quizzes/${id}/${0}`)}
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
