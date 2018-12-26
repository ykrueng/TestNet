import React, { Component } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getQuizz, updateQuizz } from '../../store/actions';

class UpdateForm extends Component {
  state = {
    title: '',
    topic: '',
  }

  componentDidMount() {
    const { getQuizz, match, token } = this.props;
    getQuizz(match.params.id, token);
  }

  componentWillReceiveProps(props) {
    if (props.quiz.id === Number(this.props.match.params.id)) {
      this.setState({
        title: props.quiz.title,
        topic: props.quiz.topic,
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleUpdate = e => {
    e.preventDefault();

    const { title, topic } = this.state;
    const { match, token } = this.props;

    const quiz = {
      title,
      topic,
    }

    const id = Number(match.params.id);
    this.props.updateQuizz(id, quiz, token);
  }

  render() {
    const { title, topic } = this.state;
    const { history, quiz } = this.props;
    return (
      <Segment
        style={{
          maxWidth: '60rem',
          margin: '2rem auto',
        }}
      >
        <Header textAlign="center" as="h1">Update Form</Header>
        <Form onSubmit={this.handleUpdate}>
          <Form.Group widths="equal">
            <Form.Input
              label="Title"
              name="title"
              value={title}
              onChange={this.handleChange}
              style={{
                border: 'none'
              }}
            />
            <Form.Input
              label="Topic"
              name="topic"
              value={topic}
              onChange={this.handleChange}
              style={{
                border: 'none'
              }}
            />
          </Form.Group>
          {
            (quiz.title !== title || quiz.topic !== topic) &&
            <>
              <Button primary type="submit">Update</Button>
              <Button onClick={() => history.push('/quizzes')}>Cancel</Button>
            </>
          }
        </Form>
      </Segment>
    );
  }
}

export default connect(
  state => ({
    token: state.loginReducer.token,
    user: state.loginReducer.user,
    quiz: state.quizzReducer.quizz,
    fetchingQuizz: state.quizzReducer.fetchingQuizz,
  }),
  {
    getQuizz, updateQuizz
  }
)(UpdateForm);