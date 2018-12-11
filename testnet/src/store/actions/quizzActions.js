import study from "../../apis/react-study";

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

export const getQuizz = quizzId => dispatch => {
  dispatch({ type: QUIZZ_REQUEST });

  study
    .get(`/quizzes/${quizzId}`)
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
};

export const postQuizz = (quizz, token) => dispatch => {
  dispatch({ type: POST_QUIZZ_REQUEST });

  study({
      method: 'post',
      url: '/quizzes',
      data: quizz,
      headers: { authorization:token }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: POST_QUIZZ_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: POST_QUIZZ_FAILURE,
        payload: { err }
      });
    });
};

export const updateQuizz = (quizzId, quizz, token) => dispatch => {
  dispatch({ type: PATCH_QUIZZ_REQUEST });

  study({
      method: 'patch',
      url: `/quizzes/${quizzId}/edit`,
      data: quizz,
      headers: { authorization:token }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: PATCH_QUIZZ_SUCCESS,
        payload: res.data
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
      method: 'delete',
      url: `/quizzes/${quizzId}`,
      headers: { authorization: token }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: DELETE_QUIZZ_SUCCESS,
        payload: res.data
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
        payload: res.data
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
  dispatch({ type: POST_QUIZZ_REQUEST });

  study({
      method: 'post',
      url: `/quizzes/${quizzId}/questions`,
      data: question,
      headers: { authorization:token }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: POST_QUIZZ_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: POST_QUIZZ_FAILURE,
        payload: { err }
      });
    });
};

export const updateQuestion = (quizzId, questionId, question, token) => dispatch => {
  dispatch({ type: PATCH_QUIZZ_REQUEST });

  study({
      method: 'patch',
      url: `/quizzes/${quizzId}/questions/${questionId}`,
      data: question,
      headers: { authorization:token }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: PATCH_QUIZZ_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PATCH_QUIZZ_FAILURE,
        payload: { err }
      });
    });
};

export const deleteQuestion = (quizzId, questionId, token) => dispatch => {
  dispatch({ type: DELETE_QUIZZ_REQUEST });

  study({
      method: 'delete',
      url: `/quizzes/${quizzId}/questions/${questionId}`,
      headers: { authorization:token }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: DELETE_QUIZZ_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_QUIZZ_FAILURE,
        payload: { err }
      });
    });
};