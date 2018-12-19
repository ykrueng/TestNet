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
        this.setState({ vote: 1 });
      } else {
        this.setState({ vote: -1 });
      }
    }
  };
  handleToggle = () => {
    this.setState({ favorite: !this.state.favorite });
  };

  save = (id, obj, token) => {
    this.props.userResults(id, obj, token);
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
                  basic
                  color="yellow"
                  labelPosition="left"
                  onClick={() => this.handleToggle()}
                >
                  <Icon name="favorite" color="yellow" />
                  Favorite
                </Button>
                <Button
                  basic
                  positive
                  color="green"
                  content="+1"
                  name="up"
                  selected={this.state.vote === 1}
                  onClick={e => this.handleChange(e)}
                />
                <Button
                  basic
                  negative
                  content="-1"
                  color="red"
                  name="down"
                  selected={this.state.vote === -1}
                  onClick={e => this.handleChange(e)}
                />
              </Button.Group>
            </Segment>
          </Segment.Group>

          <Button
            primary
            attached="bottom"
            color="blue"
            as={Link}
            to="/"
            onClick={() => this.props.userResults(id, this.state, token)}
            content={`Save Result & Exit`}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { loginReducer } = state;
  return {
    token: loginReducer.token
  };
};

export default connect(
  mapStateToProps,
  { userResults }
)(ResultForm);
