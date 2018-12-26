import React from "react";
import { Segment, Button, Icon, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userResults } from "../../store/actions/quizzActions";

class ResultForm extends React.Component {
  state = {
    vote: 0,
    favorite: false,
    score: this.props.score
  };

  handleChange = e => {
    if (-1 <= this.state.vote <= 1) {
      if (e.target.name === "up") {
        this.state.vote === 1
          ? this.setState({ vote: 0 })
          : this.setState({ vote: 1 });
      } else {
        this.state.vote === -1
          ? this.setState({ vote: 0 })
          : this.setState({ vote: -1 });
      }
    }
  };
  handleToggle = () => {
    this.setState({ favorite: !this.state.favorite });
  };

  save = (id, obj, token) => {
    this.props.userResults(id, obj, token);
    this.setState({ vote: 0, score: 0 });
  };
  render() {
    const { token, id } = this.props;
    return (
      <Grid container centered>
        <Grid.Column>
          <Segment.Group horizontal={true}>
            <Segment>
              <Button.Group attached="top">
                <Button
                  icon
                  inverted={!this.state.favorite}
                  color="yellow"
                  labelPosition="left"
                  onClick={() => this.handleToggle()}
                >
                  <Icon name="favorite" color="yellow" />
                  Favorite
                </Button>
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
            attached="bottom"
            color="blue"
            as={Link}
            to="/"
            onClick={() => this.save(id, this.state, token)}
            content={`Save Result & Exit`}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  ({ loginReducer }) => ({
    token: loginReducer.token
  }),
  { userResults }
)(ResultForm);
