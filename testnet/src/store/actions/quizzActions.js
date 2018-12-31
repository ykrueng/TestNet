import study from "../../apis/react-study";
import _ from "lodash";

/*
  Quizz Action Types
*/
export const QUIZZES_REQUEST = "QUIZZES_REQUEST";
export const QUIZZES_SUCCESS = "QUIZZES_SUCCESS";
export const QUIZZES_FAILURE = "QUIZZES_FAILURE";

export const QUIZZ_REQUEST = "QUIZZ_REQUEST";
export const QUIZZ_SUCCESS = "QUIZZ_SUCCESS";
export const QUIZZ_FAILURE = "QUIZZ_FAILURE";

export const POST_QUIZZ_REQUEST = "POST_QUIZZ_REQUEST";
export const POST_QUIZZ_SUCCESS = "POST_QUIZZ_SUCCESS";
export const POST_QUIZZ_FAILURE = "POST_QUIZZ_FAILURE";

export const PATCH_QUIZZ_REQUEST = "PATCH_QUIZZ_REQUEST";
export const PATCH_QUIZZ_SUCCESS = "PATCH_QUIZZ_SUCCESS";
export const PATCH_QUIZZ_FAILURE = "PATCH_QUIZZ_FAILURE";

export const DELETE_QUIZZ_REQUEST = "DELETE_QUIZZ_REQUEST";
export const DELETE_QUIZZ_SUCCESS = "DELETE_QUIZZ_SUCCESS";
export const DELETE_QUIZZ_FAILURE = "DELETE_QUIZZ_FAILURE";

export const TOPICS_REQUEST = "TOPICS_REQUEST";
export const TOPICS_SUCCESS = "TOPICS_SUCCESS";
export const TOPICS_FAILURE = "TOPICS_FAILURE";

export const QUESTIONS_REQUEST = "QUESTIONS_REQUEST";
export const QUESTIONS_SUCCESS = "QUESTIONS_SUCCESS";
export const QUESTIONS_FAILURE = "QUESTIONS_FAILURE";

export const POST_QUESTION_REQUEST = "POST_QUESTION_REQUEST";
export const POST_QUESTION_SUCCESS = "POST_QUESTION_SUCCESS";
export const POST_QUESTION_FAILURE = "POST_QUESTION_FAILURE";

export const PATCH_QUESTION_REQUEST = "PATCH_QUESTION_REQUEST";
export const PATCH_QUESTION_SUCCESS = "PATCH_QUESTION_SUCCESS";
export const PATCH_QUESTION_FAILURE = "PATCH_QUESTION_FAILURE";

export const DELETE_QUESTION_REQUEST = "DELETE_QUESTION_REQUEST";
export const DELETE_QUESTION_SUCCESS = "DELETE_QUESTION_SUCCESS";
export const DELETE_QUESTION_FAILURE = "DELETE_QUESTION_FAILURE";

export const SINGLE_Q_REQUEST = "SINGLE_Q_REQUEST";
export const SINGLE_Q_SUCCESS = "SINGLE_Q_SUCCESS";
export const SINGLE_Q_FAILURE = "SINGLE_Q_FAILURE";

export const RESULT_REQUEST = "RESULT_REQUEST";
export const RESULT_SUCCESS = "RESULT_SUCCESS";
export const RESULT_FAILURE = "RESULT_FAILURE";

export const ANSWER_REQUEST = "ANSWER_REQUEST";
export const ANSWER_SUCCESS = "ANSWER_SUCCESS";
export const ANSWER_FAILURE = "ANSWER_FAILURE";

export const CLEAR_QUIZ = "CLEAR_QUIZ";

/*
  Quizz Action Creators
*/
export const getQuizzes = () => dispatch => {
  dispatch({ type: QUIZZES_REQUEST });

  study
    .get("/quizzes")
    .then(res => {
      dispatch({
        type: QUIZZES_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: QUIZZES_FAILURE,
        payload: { err }
      });
    });
};

export const getQuizz = (quizzId, token) => dispatch => {
  dispatch({ type: QUIZZ_REQUEST });
  if (token) {
    study({
      method: "get",
      url: `/quizzes/${quizzId}`,
      headers: { Authorization: token }
    })
      .then(res => {
        dispatch({
          type: QUIZZ_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: QUIZZ_FAILURE,
          payload: { err }
        });
      });
  } else {
    study
      .get(`/quizzes/${quizzId}`)
      .then(res => {
        dispatch({ type: QUIZZ_SUCCESS, payload: res.data });
      })
      .catch(err => dispatch({ type: QUIZZ_FAILURE, payload: err }));
  }
};

export const postQuizz = (quiz, author, token) => dispatch => {
  dispatch({ type: POST_QUIZZ_REQUEST });

  study({
    method: "post",
    url: "/quizzes",
    data: quiz,
    headers: { authorization: token }
  })
    .then(res => {
      dispatch({
        type: POST_QUIZZ_SUCCESS,
        payload: {
          ...quiz,
          id: res.data[0],
          author: author,
          votes: 0,
          description: null
        }
      });
    })
    .catch(err => {
      dispatch({
        type: POST_QUIZZ_FAILURE,
        payload: { err }
      });
    });
};

export const updateQuizz = (quizId, quiz, token) => dispatch => {
  dispatch({ type: PATCH_QUIZZ_REQUEST });

  study({
    method: "patch",
    url: `/quizzes/${quizId}/edit`,
    data: quiz,
    headers: { authorization: token }
  })
    .then(res => {
      console.log(res);
      dispatch({
        type: PATCH_QUIZZ_SUCCESS,
        payload: {
          id: quizId,
          quiz,
        }
      });
    })
    .catch(err => {
      dispatch({
        type: PATCH_QUIZZ_FAILURE,
        payload: { err }
      });
    });
};

export const deleteQuizz = (quizzId, token) => dispatch => {
  dispatch({ type: DELETE_QUIZZ_REQUEST });

  study({
    method: "delete",
    url: `/quizzes/${quizzId}`,
    headers: { authorization: token }
  })
    .then(res => {
      console.log(res);
      dispatch({
        type: DELETE_QUIZZ_SUCCESS,
        payload: quizzId, // cannot use res.data because it's not returning quizId
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_QUIZZ_FAILURE,
        payload: { err }
      });
    });
};

export const getTopics = () => dispatch => {
  dispatch({ type: TOPICS_REQUEST });

  study
    .get(`/quizzes/topics`)
    .then(res => {
      dispatch({
        type: TOPICS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: TOPICS_FAILURE,
        payload: { err }
      });
    });
};

export const getQuestions = id => dispatch => {
  dispatch({ type: QUESTIONS_REQUEST });

  study
    .get(`/quizzes/${id}/questions`)
    .then(res => {
      dispatch({
        type: QUESTIONS_SUCCESS,
        payload: _.shuffle(res.data)
      });
    })
    .catch(err => {
      dispatch({
        type: QUESTIONS_FAILURE,
        payload: { err }
      });
    });
};

export const postQuestion = (quizzId, question, token) => dispatch => {
  dispatch({ type: POST_QUESTION_REQUEST });

  study({
    method: "post",
    url: `/quizzes/${quizzId}/questions`,
    data: question,
    headers: { authorization: token }
  })
    .then(res => {
      const newQuestion = {
        id: res.data[0],
        question: question.question,
        options: [question.option1, question.option2],
      }
      if (question.option3) newQuestion.options.push(question.option3);
      if (question.option4) newQuestion.options.push(question.option4);
      dispatch({
        type: POST_QUESTION_SUCCESS,
        payload: {
          id: quizzId,
          question: newQuestion,
        },
      });
    })
    .catch(err => {
      dispatch({
        type: POST_QUESTION_FAILURE,
        payload: { err }
      });
    });
};
export const updateQuestion = (quizId, questionId, question, token) => dispatch => {
  dispatch({ type: PATCH_QUESTION_REQUEST });
  study({
    method: "patch",
    url: `/quizzes/${quizId}/questions/${questionId}`,
    data: question,
    headers: { authorization: token }
  })
    .then(res => {
      const newQuestion = {
        id: res.data[0],
        question: question.question,
        options: [question.option1, question.option2],
      }
      if (question.option3) newQuestion.options.push(question.option3);
      if (question.option4) newQuestion.options.push(question.option4);
      dispatch({
        type: PATCH_QUESTION_SUCCESS,
        payload: newQuestion,
      });
    })
    .catch(err => {
      dispatch({
        type: PATCH_QUESTION_FAILURE,
        payload: { err }
      });
    });
};

// don't need token to checkAnswer

export const checkAnswer = (quizzId, questionId, answer) => dispatch => {
  dispatch({ type: ANSWER_REQUEST });

  study({
    method: "get",
    url: `/quizzes/${quizzId}/questions/${questionId}/response`,
    params: answer
  })
    .then(res => {
      dispatch({
        type: ANSWER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ANSWER_FAILURE,
        payload: { err }
      });
    });
};

export const deleteQuestion = (quizzId, questionId, token) => dispatch => {
  dispatch({ type: DELETE_QUESTION_REQUEST });

  study({
    method: "delete",
    url: `/quizzes/${quizzId}/questions/${questionId}`,
    headers: { authorization: token }
  })
    .then(res => {
      console.log(res);
      dispatch({
        type: DELETE_QUESTION_SUCCESS,
        payload: {
          quizId: quizzId,
          questionId: questionId,
        }, // cannot use res.data coz its not returning questionId
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_QUESTION_FAILURE,
        payload: { err }
      });
    });
};

export const getQuestion = (quizId, questionId) => dispatch => {
  dispatch({ type: SINGLE_Q_REQUEST });
  study
    .get(`/quizzes/${quizId}/questions/${questionId}`)
    .then(res => {
      dispatch({
        type: SINGLE_Q_SUCCESS,
        payload: {
          ...res.data,
          options: _.shuffle(res.data.options.map((option, i) => [i, option]))
        }
      });
    })
    .catch(err => dispatch({ type: SINGLE_Q_FAILURE, payload: err }));
};

export const userResults = (quizId, info, token, diff) => dispatch => {
  dispatch({ type: RESULT_REQUEST });
  study({
    method: "patch",
    url: `/quizzes/${quizId}`,
    headers: { Authorization: token },
    data: info
  })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: RESULT_SUCCESS, payload: {
          quizId,
          vote: diff,
      } });
    })
    .catch(err => dispatch({ type: RESULT_FAILURE, payload: err }));
};

export const clearQuiz = () => {
  return ({ type: CLEAR_QUIZ });
}