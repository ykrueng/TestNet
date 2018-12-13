import React from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { userResults } from "../../store/actions/quizzActions";

class ResultForm extends React.Component {
  state = {
    vote: 0,
    favorite: false,
    score: this.props.score
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleToggle = () => {
    this.setState({ favorite: !this.state.favorite });
  };
  render() {
    console.log(this.props);
    return (
      <Form>
        <Button content="Favorite" onClick={() => this.handleToggle} />
        <Button icon="thumbs up outline" name="up" />
        <Button icon="thumbs down outline" name="down" />
        <Button onClick={() => this.props.userResults()} />
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
