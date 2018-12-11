import React from 'react';
import { connect } from 'react-redux';

import {
  login,
  getQuizzes,
  getQuizz,
  getTopics,
  getQuestions,
  postQuizz,
  updateQuizz,
  postQuestion,
  deleteQuizz,
  deleteQuestion,
  getPosts,
  getPost,
} from '../store/actions';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTQ0NTM1NDk0LCJleHAiOjE1NzYwOTMwOTR9.qcXR5sKpM_F36kbkT3Zd1_S6BtxR0NSXkLOIrGbNrvo";

class DummyView extends React.Component {
  componentDidMount() {
    console.log('mounted');
    // this.props.login({email: 'boom@cooltable.io', password: 'password'});
    // this.props.getQuizzes();
    // this.props.getQuestions(1);
    // this.props.postQuizz({ title: 'TestNet - Quizz I', topic: 'JavaScript' }, token);
    this.props.updateQuizz(82, {title: 'Updated - Quizz'}, token);
    // this.props.getQuizz(1);
    // this.props.getTopics();
    // this.props.postQuestion(82, {
    //   question: 'More Test Question?',
    //   option1: 'maybe',
    //   option2: 'nope',
    //   answer: 2,
    // },token);
    // this.props.deleteQuizz(82, );
    this.props.getPosts();
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
  getTopics,
  getQuestions,
  postQuizz,
  updateQuizz,
  postQuestion,
  getPosts,
  getPost,
  deleteQuizz,
  deleteQuestion,
})(DummyView);