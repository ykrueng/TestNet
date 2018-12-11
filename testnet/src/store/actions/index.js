import study from "../../apis/react-study";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const QUIZZES_REQUEST = "QUIZZES_REQUEST";
export const QUIZZES_SUCCESS = "QUIZZES_SUCCESS";
export const QUIZZES_FAILURE = "QUIZZES_FAILURE";

export const QUIZZ_REQUEST = "QUIZZ_REQUEST";
export const QUIZZ_SUCCESS = "QUIZZ_SUCCESS";
export const QUIZZ_FAILURE = "QUIZZ_FAILURE";

export const POST_QUIZZ_REQUEST = "POST_QUIZZ_REQUEST";
export const POST_QUIZZ_SUCCESS = "POST_QUIZZ_SUCCESS";
export const POST_QUIZZ_FAILURE = "POST_QUIZZ_FAILURE";

export const TOPICS_REQUEST = "TOPICS_REQUEST";
export const TOPICS_SUCCESS = "TOPICS_SUCCESS";
export const TOPICS_FAILURE = "TOPICS_FAILURE";

export const QUESTIONS_REQUEST = "QUESTIONS_REQUEST";
export const QUESTIONS_SUCCESS = "QUESTIONS_SUCCESS";
export const QUESTIONS_FAILURE = "QUESTIONS_FAILURE";

/*
  actions type for POST
*/
export const POSTS_REQUEST = "POSTS_REQUEST";
export const POSTS_SUCCESS = "POSTS_SUCCESS";
export const POSTS_FAILURE = "POSTS_FAILURE";

export const POST_REQUEST = "POST_REQUEST";
export const POST_SUCCESS = "POST_SUCCESS";
export const POST_FAILURE = "POST_FAILURE";

export const COMMENTS_REQUEST = "COMMENTS_REQUEST";
export const COMMENTS_SUCCESS = "COMMENTS_SUCCESS";
export const COMMENTS_FAILURE = "COMMENTS_FAILURE";

export const COMMENT_REQUEST = "COMMENT_REQUEST";
export const COMMENT_SUCCESS = "COMMENT_SUCCESS";
export const COMMENT_FAILURE = "COMMENT_FAILURE";

export const register = user => dispatch => {
  dispatch({ type: REGISTER_REQUEST });

  study
    .post("/auth/register", user)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: res.token
        }
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAILURE,
        payload: { err }
      });
    });
};

export const login = user => dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  study
    .post("/auth/login", user)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token: res.data.token }
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { err }
      });
    });
};

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

export const postQuizz = (quizz, token) => dispatch => {
  dispatch({ type: POST_QUIZZ_REQUEST });

  study
    .post("/quizzes", quizz, { authorization: token })
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

/*
    Post action creators
  */
export const getPosts = () => dispatch => {
  dispatch({ type: POSTS_REQUEST });

  study
    .get(`/posts`)
    .then(res => {
      dispatch({
        type: POSTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: POSTS_FAILURE,
        payload: { err }
      });
    });
};

export const getPost = postId => dispatch => {
  dispatch({ type: POST_REQUEST });

  study
    .get(`/posts/${postId}`)
    .then(res => {
      dispatch({
        type: POST_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: POST_FAILURE,
        payload: { err }
      });
    });
};

export const getComments = postId => dispatch => {
  dispatch({ type: COMMENTS_REQUEST });

  study
    .get(`/posts/${postId}/comments`)
    .then(res => {
      dispatch({
        type: COMMENTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: COMMENTS_FAILURE,
        payload: { err }
      });
    });
};

export const getComment = (postId, commentId) => dispatch => {
  dispatch({ type: COMMENT_REQUEST });

  study
    .get(`/posts/${postId}/comments/${commentId}`)
    .then(res => {
      dispatch({
        type: COMMENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: COMMENT_FAILURE,
        payload: { err }
      });
    });
};
