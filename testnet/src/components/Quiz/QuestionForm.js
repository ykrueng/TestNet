import React, { Component } from "react";
import { Segment, Form, Dropdown, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import { postQuestion } from "../../store/actions";

class QuestionForm extends Component {
  state = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: null
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { question, option1, option2, option3, option4, answer } = this.state;
    const { postQuestion, match, token } = this.props;

    const id = match.params.id;
    const quiz = { question, option1, option2, answer };

    if (option3) quiz.option3 = option3;
    if (option4) quiz.option4 = option4;

    postQuestion(id, quiz, token);

    this.setState({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: null
    });
  };

  render() {
    const { question, option1, option2, option3, option4 } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Question"
            name="question"
            value={question}
            onChange={this.handleChange}
            required
          />
          <Form.Group widths="equal">
            <Form.Input
              label="Option 1"
              name="option1"
              value={option1}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Option 2"
              name="option2"
              value={option2}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Option 3 - optional"
              name="option3"
              value={option3}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Option 4 - optional"
              name="option4"
              value={option4}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Dropdown
            labeled
            button
            selection
            placeholder="Answer Key"
            icon="key"
            className="icon"
            name="answer"
            options={[
              { key: "option1", value: 1, text: "Option 1" },
              { key: "option2", value: 2, text: "Option 2" },
              { key: "option3", value: 3, text: "Option 3" },
              { key: "option4", value: 4, text: "Option 4" }
            ]}
            onChange={(e, data) => this.setState({ [data.name]: data.value })}
          />
          <Button type="submit" color="teal" content="Save" />
        </Form>
      </Segment>
    );
  }
}

export default connect(
  ({ loginReducer }) => ({
    token: loginReducer.token
  }),
  { postQuestion }
)(QuestionForm);
