import React from "react";
import { Segment, Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userResults } from "../../store/actions";

class ResultForm extends React.Component {
  state = {
    vote: 0,
    favorite: false,
    score: this.props.score
  };

  componentDidMount() {
    this.props.token &&
      this.setState({
        vote: this.props.quiz.user_vote,
        favorite: this.props.quiz.favorite
      });
  }

  handleChange = e => {
    if (-1 <= this.state.vote <= 1) {
      if (e.target.name === "up") {
        this.state.vote === 1 ? this.setState({ vote: 0 }) : this.setState({ vote: 1 });
      } else {
        this.state.vote === -1 ? this.setState({ vote: 0 }) : this.setState({ vote: -1 });
      }
    }
  };

  handleToggle = () => {
    this.setState({ favorite: !this.state.favorite });
  };

  save = () => {
    const { id, token, quiz } = this.props;
    const { vote, favorite, score } = this.state;
    let newStat = { score };
    if (vote !== quiz.user_vote) newStat = { ...newStat, vote };
    if (favorite !== quiz.favorite) newStat = { ...newStat, favorite };

    this.props.userResults(id, newStat, token, vote - quiz.user_vote);
    this.setState({ vote: 0, score: 0, favorite: false });
  };
  render() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Segment.Group horizontal>
            <Segment color="teal">
              <Button.Group attached="top">
                <Button
                  icon="favorite"
                  content={this.state.favorite ? "Unfavorite" : "Favorite"}
                  inverted={!this.state.favorite}
                  color="yellow"
                  labelPosition="left"
                  onClick={() => this.handleToggle()}
                />

                <Button
                  inverted={!(this.state.vote === 1)}
                  color="green"
                  content="+1"
                  name="up"
                  onClick={e => this.handleChange(e)}
                />
                <Button
                  inverted={!(this.state.vote === -1)}
                  content="-1"
                  color="red"
                  name="down"
                  onClick={e => this.handleChange(e)}
                />
              </Button.Group>
            </Segment>
          </Segment.Group>
          <Button
            primary
            attached="bottom"
            as={Link}
            to="/quizzes"
            onClick={this.save}
            content="Save Result &amp; Exit"
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  ({ loginReducer, quizzReducer }) => ({
    token: loginReducer.token,
    quiz: quizzReducer.quizz
  }),
  { userResults }
)(ResultForm);
