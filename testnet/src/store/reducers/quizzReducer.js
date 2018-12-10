import {
  QUIZZES_REQUEST,
  QUIZZES_SUCCESS,
  QUIZZES_FAILURE,
  QUESTIONS_REQUEST,
  QUESTIONS_SUCCESS,
  QUESTIONS_FAILURE,
} from '../actions';

const initialState = {
  quizzes: [],
  questions: [],
  fetchingQuizzes: false,
  fetchingQuestions: false,
  error: null,
}

export const quizzReducer = (state=initialState, action) => {
  switch(action.type) {
    case QUIZZES_REQUEST:
      return {
        ...state,
        fetchingQuizzes: true,
      }
    case QUIZZES_SUCCESS:
      return {
        ...state,
        fetchingQuizzes: false,
        quizzes: action.payload,
      }
    case QUIZZES_FAILURE:
      return {
        ...state,
        fetchingQuizzes: false,
        error: action.payload,
      }
      case QUESTIONS_REQUEST:
      return {
        ...state,
        fetchingQuestions: true,
      }
    case QUESTIONS_SUCCESS:
      return {
        ...state,
        fetchingQuestions: false,
        questions: action.payload,
      }
    case QUESTIONS_FAILURE:
      return {
        ...state,
        fetchingQuestions: false,
        error: action.payload,
      }
    default:
      return state;
  }
}