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
  PATCH_QUESTION_REQUEST,
  PATCH_QUESTION_SUCCESS,
  PATCH_QUESTION_FAILURE,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE,
  SINGLE_Q_REQUEST,
  SINGLE_Q_SUCCESS,
  SINGLE_Q_FAILURE,
  RESULT_REQUEST,
  RESULT_SUCCESS,
  RESULT_FAILURE,
  ANSWER_REQUEST,
  ANSWER_SUCCESS,
  ANSWER_FAILURE,
  CLEAR_QUIZ,
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
  updatingQuiz: false,
  checkingAnswer: false,
  checkDone: false,
  fetchingTopics: false,
  fetchingQuestions: false,
  fetchingQuestion: false,
  postingQuiz: false,
  postingQuestion: false,
  postingResults: false,
  deletingQuiz: false,
  deletingQuestion: false,
  error: null,
  quizzesError: null,
  quizError: null,
  updateQuizError: null,
  deleteQuizError: null,
  quizDeleted: false,
  questionsError: null,
  postingQuizError: null,
  postingQuestionError: null,
};

export const quizzReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZZES_REQUEST:
      return {
        ...state,
        fetchingQuizzes: true,
        quizzesError: false,
      };
    case QUIZZES_SUCCESS:
      return {
        ...state,
        fetchingQuizzes: false,
        quizzesError: false,
        quizzes: action.payload
      };
    case QUIZZES_FAILURE:
      return {
        ...state,
        fetchingQuizzes: false,
        quizzesError: true,
        error: action.payload
      };
    case QUIZZ_REQUEST:
      return {
        ...state,
        fetchingQuizz: true,
        quizDeleted: false,
        quizError: false,
      };
    case QUIZZ_SUCCESS:
      return {
        ...state,
        fetchingQuizz: false,
        quizError: false,
        quizz: action.payload
      };
    case QUIZZ_FAILURE:
      return {
        ...state,
        fetchingQuizz: false,
        quizError: true,
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
        fetchingQuestions: true,
        questionsError: false,
      };
    case QUESTIONS_SUCCESS:
      return {
        ...state,
        fetchingQuestions: false,
        questionsError: false,
        questions: action.payload
      };
    case QUESTIONS_FAILURE:
      return {
        ...state,
        fetchingQuestions: false,
        questionsError: true,
        error: action.payload
      };
    case POST_QUIZZ_REQUEST:
      return {
        ...state,
        postingQuiz: true,
        postingQuizError: false,
        quizDeleted: false,
      };
    case POST_QUIZZ_SUCCESS:
      return {
        ...state,
        postingQuiz: false,
        postingQuizError: false,
        quizzes: [...state.quizzes, action.payload],
        quizz: action.payload,
      };
    case POST_QUIZZ_FAILURE:
      return {
        ...state,
        postingQuiz: false,
        postingQuizError: true,
        error: action.payload
      };
    case PATCH_QUIZZ_REQUEST:
      return {
        ...state,
        updatingQuiz: true,
        updateQuizError: false,
        checkDone: false
      };
    case PATCH_QUIZZ_SUCCESS:
      return {
        ...state,
        updatingQuiz: false,
        updateQuizError: false,
        checkDone: true,
        quizzes: state.quizzes.map(quiz => {
          if (quiz.id === action.payload.id) {
            return ({ ...quiz, ...action.payload.quiz });
          }
          return quiz;
        }),
        quizz: { ...state.quiz, ...action.payload.quiz }
      };
    case PATCH_QUIZZ_FAILURE:
      return {
        ...state,
        updatingQuiz: false,
        updateQuizError: true,
        error: action.payload
      };
    case DELETE_QUIZZ_REQUEST:
      return {
        ...state,
        deletingQuiz: true,
        quizDeleted: false,
        deleteQuizError: false,
      };
    case DELETE_QUIZZ_SUCCESS:
      return {
        ...state,
        deletingQuiz: false,
        quizDeleted: true,
        deleteQuizError: false,
        quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload),
      };
    case DELETE_QUIZZ_FAILURE:
      return {
        ...state,
        deletingQuiz: false,
        quizDeleted: false,
        deleteQuizError: true,
        error: action.payload
      };
    case POST_QUESTION_REQUEST:
      return {
        ...state,
        postingQuestion: true,
        postingQuestionError: false,
      };
    case POST_QUESTION_SUCCESS:
      return {
        ...state,
        postingQuestion: false,
        postingQuestionError: false,
        questions: [...state.questions, action.payload.question],
        quizzes: state.quizzes.map(quiz => {
          if (quiz.id === Number(action.payload.id)) {
            return {
              ...quiz,
              question_count: quiz.question_count + 1 || 1,
            }
          }
          return quiz;
        })
      };
    case POST_QUESTION_FAILURE:
      return {
        ...state,
        postingQuestion: false,
        postingQuestionError: true,
        error: action.payload
      };
    case PATCH_QUESTION_REQUEST:
      return {
        ...state,
        postingQuestion: true,
      };
    case PATCH_QUESTION_SUCCESS:
      return {
        ...state,
        postingQuestion: false,
        questions: state.questions.map(question => {
          if (question.id === action.payload.id) return action.payload;
          return question;
        }),
      };
    case PATCH_QUESTION_FAILURE:
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
        deletingQuestion: false,
        questions: state.questions.filter(question => (
          question.id !== action.payload.questionId
        )),
        quizzes: state.quizzes.map(quiz => {
          if (quiz.id === Number(action.payload.quizId)) {
            return {
              ...quiz,
              question_count: quiz.question_count - 1,
            }
          }
          return quiz;
        })
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
        postingResults: false,
        quizzes: state.quizzes.map(quiz => {
          if (quiz.id === Number(action.payload.quizId)) {
            return {...quiz, votes: quiz.votes + action.payload.vote}
          }
          return quiz;
        })
      };
    case RESULT_FAILURE:
      return {
        ...state,
        postingResult: false,
        error: action.payload
      };
    case ANSWER_REQUEST:
      return {
        ...state,
        checkingAnswer: true
      };
    case ANSWER_SUCCESS:
      return {
        ...state,
        checkingAnswer: false,
        answer: action.payload,
      };
    case ANSWER_FAILURE:
      return {
        ...state,
        checkingAnswer: false,
        error: action.payload
      };
    case CLEAR_QUIZ:
      return {
        ...state,
        quizz: {}
      }
    default:
      return state;
  }
};
