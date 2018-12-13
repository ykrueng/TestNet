import {
  QUIZZES_REQUEST,
  QUIZZES_SUCCESS,
  QUIZZES_FAILURE,
  QUIZZ_REQUEST,
  QUIZZ_SUCCESS,
  QUIZZ_FAILURE,
  PATCH_QUIZZ_REQUEST,
  PATCH_QUIZZ_SUCCESS,
  PATCH_QUIZZ_FAILURE,
  TOPICS_REQUEST,
  TOPICS_SUCCESS,
  TOPICS_FAILURE,
  POST_QUIZZ_REQUEST,
  POST_QUIZZ_SUCCESS,
  POST_QUIZZ_FAILURE,
  DELETE_QUIZZ_REQUEST,
  DELETE_QUIZZ_SUCCESS,
  DELETE_QUIZZ_FAILURE,
  QUESTIONS_REQUEST,
  QUESTIONS_SUCCESS,
  QUESTIONS_FAILURE,
  POST_QUESTION_REQUEST,
  POST_QUESTION_SUCCESS,
  POST_QUESTION_FAILURE,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE,
  SINGLE_Q_REQUEST,
  SINGLE_Q_SUCCESS,
  SINGLE_Q_FAILURE,
  RESULT_REQUEST,
  RESULT_SUCCESS,
  RESULT_FAILURE
} from "../actions";

const initialState = {
  quizzes: [],
  quizz: {},
  topics: [],
  questions: [],
  question: null,
  answer: "",
  questionPosted: false,
  fetchingQuizzes: false,
  fetchingQuizz: false,
  checkingAnswer: false,
  fetchingTopics: false,
  fetchingQuestions: false,
  fetchingQuestion: false,
  postingQuestion: false,
  postingResults: false,
  deletingQuizz: false,
  deletingQuestion: false,
  error: null
};

export const quizzReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZZES_REQUEST:
      return {
        ...state,
        fetchingQuizzes: true
      };
    case QUIZZES_SUCCESS:
      return {
        ...state,
        fetchingQuizzes: false,
        quizzes: action.payload
      };
    case QUIZZES_FAILURE:
      return {
        ...state,
        fetchingQuizzes: false,
        error: action.payload
      };
    case QUIZZ_REQUEST:
      return {
        ...state,
        fetchingQuizz: true
      };
    case QUIZZ_SUCCESS:
      return {
        ...state,
        fetchingQuizz: false,
        quizz: action.payload
      };
    case QUIZZ_FAILURE:
      return {
        ...state,
        fetchingQuizz: false,
        error: action.payload
      };
    case TOPICS_REQUEST:
      return {
        ...state,
        fetchingTopics: true
      };
    case TOPICS_SUCCESS:
      return {
        ...state,
        fetchingTopics: false,
        topics: action.payload
      };
    case TOPICS_FAILURE:
      return {
        ...state,
        fetchingTopics: false,
        error: action.payload
      };
    case QUESTIONS_REQUEST:
      return {
        ...state,
        fetchingQuestions: true
      };
    case QUESTIONS_SUCCESS:
      return {
        ...state,
        fetchingQuestions: false,
        questions: action.payload
      };
    case QUESTIONS_FAILURE:
      return {
        ...state,
        fetchingQuestions: false,
        error: action.payload
      };
    case POST_QUIZZ_REQUEST:
      return {
        ...state,
        postingQuizz: true
      };
    case POST_QUIZZ_SUCCESS:
      return {
        ...state,
        postingQuizz: false,
        questionPosted: action.payload
      };
    case POST_QUIZZ_FAILURE:
      return {
        ...state,
        postingQuizz: false,
        error: action.payload
      };
    case PATCH_QUIZZ_REQUEST:
      return {
        ...state,
        checkingAnswer: true
      };
    case PATCH_QUIZZ_SUCCESS:
      return {
        ...state,
        checkingAnswer: false,
        answer: action.payload
        // TODO: add res to the state if needed
      };
    case PATCH_QUIZZ_FAILURE:
      return {
        ...state,
        checkingAnswer: false,
        error: action.payload
      };
    case DELETE_QUIZZ_REQUEST:
      return {
        ...state,
        deletingQuizz: true
      };
    case DELETE_QUIZZ_SUCCESS:
      return {
        ...state,
        deletingQuizz: false
        // TODO: add res to the state if needed
      };
    case DELETE_QUIZZ_FAILURE:
      return {
        ...state,
        deletingQuizz: false,
        error: action.payload
      };
    case POST_QUESTION_REQUEST:
      return {
        ...state,
        postingQuestion: true
      };
    case POST_QUESTION_SUCCESS:
      return {
        ...state,
        postingQuestion: false
        // TODO: add res to the state if needed
      };
    case POST_QUESTION_FAILURE:
      return {
        ...state,
        postingQuestion: false,
        error: action.payload
      };
    case DELETE_QUESTION_REQUEST:
      return {
        ...state,
        deletingQuestion: true
      };
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        deletingQuestion: false
        // TODO: add res to the state if needed
      };
    case DELETE_QUESTION_FAILURE:
      return {
        ...state,
        deletingQuestion: false,
        error: action.payload
      };
    case SINGLE_Q_REQUEST:
      return {
        ...state,
        fetchingQuestion: true
      };
    case SINGLE_Q_SUCCESS:
      return {
        ...state,
        fetchingQuestion: false,
        question: action.payload
      };
    case SINGLE_Q_FAILURE:
      return {
        ...state,
        fetchingQuestion: false,
        error: action.payload
      };
    case RESULT_REQUEST:
      return {
        ...state,
        postingResults: true
      };
    case RESULT_SUCCESS:
      return {
        ...state,
        postingResults: false
      };
    case RESULT_FAILURE:
      return {
        ...state,
        postingResult: false,
        error: action.payload
      };
    default:
      return state;
  }
};
