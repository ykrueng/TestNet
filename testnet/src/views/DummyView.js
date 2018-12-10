import React from 'react';
import { connect } from 'react-redux';

import { getQuizzes, getQuestions } from '../store/actions';

class DummyView extends React.Component {
  componentDidMount() {
    this.props.getQuizzes();
    this.props.getQuestions(1);
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
  getQuizzes,
  getQuestions,
})(DummyView);