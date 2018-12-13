import React from "react";
import { Form, Button } from "semantic-ui-react";
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
    console.log(e.target.textContent);
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
    console.log(this.props, this.state);
    const { token, id } = this.props;
    console.log(token);
    return (
      <Form>
        <Button content="Favorite" onClick={() => this.handleToggle()} />
        <Button
          content="+1 Vote"
          name="up"
          selected={this.state.vote === 1}
          onClick={e => this.handleChange(e)}
        />
        <Button
          content="-1 Vote"
          name="down"
          selected={this.state.vote === -1}
          onClick={e => this.handleChange(e)}
        />
        <Button
          as={Link}
          to="/"
          onClick={() => this.props.userResults(id, this.state, token)}
          content="Save"
        />
      </Form>
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
