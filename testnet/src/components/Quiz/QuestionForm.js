import React, { Component } from 'react';
import { Segment, Form, Dropdown } from 'semantic-ui-react';

class QuestionForm extends Component {
  state = {  }
  render() { 
    return (
      <Segment>
        <Form>
          <Form.Input label="Question" />
          <Form.Group widths="equal">
            <Form.Input
              label="Option 1"
              name="title"
              onChange={this.handleChange}
              style={{
                border: 'none'
              }}
            />
            <Form.Input
              label="Option 2"
              name="topic"
              onChange={this.handleChange}
              style={{
                border: 'none'
              }}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Option 3 - optional"
              name="title"
              onChange={this.handleChange}
              style={{
                border: 'none'
              }}
            />
            <Form.Input
              label="Option 4 - optional"
              name="topic"
              onChange={this.handleChange}
              style={{
                border: 'none'
              }}
            />
          </Form.Group>
          <Dropdown placeholder='Answer Key' icon='key' floating labeled button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item text='Option 1' />
              <Dropdown.Item text='Option 2' />
              <Dropdown.Item text='Option 3' />
              <Dropdown.Item text='Option 4' />
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Segment>
    );
  }
}

export default QuestionForm;