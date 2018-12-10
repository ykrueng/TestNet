import React from 'react';
import { connect } from 'react-redux';

import {
  login,
  getQuizzes,
  getQuizz,
  getQuestions,
  postQuizz,
} from '../store/actions';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTQ0NDgxNTY0LCJleHAiOjE1NzYwMzkxNjR9.qG2A4uxwYmH_eXab-88Aq4knMrZdaRPtkEt8OreYLGc"

class DummyView extends React.Component {
  componentDidMount() {
    // this.props.login({email: 'boom@cooltable.io', password: 'password'});
    // this.props.getQuizzes();
    // this.props.getQuestions(1);
    // this.props.postQuizz({ title: 'Redux-Thunk', topic: 'Redux'}, token);
    // this.props.getQuizz(1);
  }

  render() {
    return (
      <div>
        Dummy View
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quizzes: state.quizzReducer.quizzes,
  fetchingQuizzes: state.quizzReducer.fetchingQuizzes,
})

export default connect(mapStateToProps, {
  login,
  getQuizzes,
  getQuizz,
  getQuestions,
  postQuizz,
})(DummyView);