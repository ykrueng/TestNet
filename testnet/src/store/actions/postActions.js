import study from "../../apis/react-study";

/*
  Post Action Types
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



/*
  Post Action Creators
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