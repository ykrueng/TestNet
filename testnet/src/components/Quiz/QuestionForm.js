import React, { Component } from 'react';
import { Segment, Form, Dropdown } from 'semantic-ui-react';

class QuestionForm extends Component {
  state = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: null,
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { question, option1, option2, option3, option4, answer } = this.state;

    return (
      <Segment>
        <Form>
          <Form.Input
            label="Question"
            name="question"
            value={question}
            onChange={this.handleChange}
          />
          <Form.Group widths="equal">
            <Form.Input
              label="Option 1"
              name="option1"
              value={option1}
              onChange={this.handleChange}
              style={{
                border: 'none'
              }}
            />
            <Form.Input
              label="Option 2"
              name="option2"
              value={option2}
              onChange={this.handleChange}
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
            placeholder='Answer Key'
            icon='key' labeled button
            className='icon'
            selection
            name="answer"
            options={[
              { key: "option1", value: "option1", text: "Option 1" },
              { key: "option2", value: "option2", text: "Option 2" },
              { key: "option3", value: "option3", text: "Option 3" },
              { key: "option4", value: "option4", text: "Option 4" },
            ]}
            onChange={
              (e, data) => this.setState({ [data.name]: data.value })
            }
          />

        </Form>
      </Segment>
    );
  }
}

export default QuestionForm;