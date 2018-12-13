import React from "react";
import { Header, Button, Image, Segment } from "semantic-ui-react";
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
    const { quizz, questions } = this.props;
    const firstQuestion = questions ? questions[0] : null;
    const empty = questions.length > 0 ? false : true;

    return (
      <div className="quiz">
        <Segment clearing>
          <Header as="h2">{quizz.title}</Header>

          <Button
            basic
            disabled={empty}
            content="Begin Quiz"
            floated="right"
            color="green"
            onClick={() =>
              this.props.history.push(`/quizzes/${id}/${firstQuestion.id}`)
            }
          />

          <Header as="h5">
            {quizz.topic}
            <Header.Subheader>
              submitted by:
              {quizz.author ? (
                <Image circular src={quizz.author.img_url} avatar />
              ) : null}
              {quizz.author ? quizz.author.username : "Loading"}
            </Header.Subheader>

            <Header.Subheader content={`${quizz.votes} Votes`} />
          </Header>
        </Segment>
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
