import React from "react";
import { Header, Button, Image, Segment, Icon, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { getQuizz, getQuestions } from "../../store/actions/quizzActions";

class Quiz extends React.Component {
  componentDidMount() {
    this.props.getQuizz(this.props.match.params.id, this.props.token);
    this.props.getQuestions(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      return true;
    }
    return false;
  }

  render() {
    const { quiz, questions, history, fetching } = this.props;

    const { id } = this.props.match.params;
    const firstQuestion = questions ? questions[0] : null;
    if (fetching) {
      return (
        <Segment textAlign="center" style={{ maxWidth: "60rem", margin: "2.5% auto" }} clearing>
          <Loader active inline content="Loading" />
        </Segment>
      );
    }
    return (
      <Segment style={{ maxWidth: "60rem", margin: "2.5% auto" }} clearing>
        <Header as="h2" color={quiz.favorite ? "yellow" : null} size="large">
          {quiz.favorite && <Icon name="star outline" />}
          {quiz.title}
        </Header>

        <Button
          basic
          disabled={questions.length > 0 ? false : true}
          content="Begin Quiz"
          floated="right"
          color="green"
          onClick={() => history.push(`/quizzes/${id}/${firstQuestion.id}`)}
        />
        <Header as="h4">
          {quiz.topic}
          <Header.Subheader>
            submitted by:
            {quiz.author ? (
              quiz.author.img_url ? (
                <Image circular src={quiz.author.img_url} avatar />
              ) : null
            ) : null}
            {quiz.author && ` ${quiz.author.username}`}
          </Header.Subheader>

          <Header.Subheader
            content={`${quiz.votes} Votes Total ${
              quiz.user_vote !== undefined ? `(Your Vote: ${quiz.user_vote})` : ""
            }`}
          />
        </Header>
        {quiz.score !== undefined && (
          <Header as="h5" content={`Last Score: ${quiz.score}/${questions.length}`} />
        )}
      </Segment>
    );
  }
}

export default connect(
  ({ quizzReducer, loginReducer }) => ({
    quiz: quizzReducer.quizz,
    questions: quizzReducer.questions,
    fetching: quizzReducer.fetchingQuizz,
    token: loginReducer.token
  }),
  { getQuizz, getQuestions }
)(Quiz);
