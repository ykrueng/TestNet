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

export const POST_POST_REQUEST = "POST_POST_REQUEST";
export const POST_POST_SUCCESS = "POST_POST_SUCCESS";
export const POST_POST_FAILURE = "POST_POST_FAILURE";

export const PATCH_POST_REQUEST = "PATCH_POST_REQUEST";
export const PATCH_POST_SUCCESS = "PATCH_POST_SUCCESS";
export const PATCH_POST_FAILURE = "PATCH_POST_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const COMMENTS_REQUEST = "COMMENTS_REQUEST";
export const COMMENTS_SUCCESS = "COMMENTS_SUCCESS";
export const COMMENTS_FAILURE = "COMMENTS_FAILURE";

export const COMMENT_REQUEST = "COMMENT_REQUEST";
export const COMMENT_SUCCESS = "COMMENT_SUCCESS";
export const COMMENT_FAILURE = "COMMENT_FAILURE";

export const POST_COMMENT_REQUEST = "POST_COMMENT_REQUEST";
export const POST_COMMENT_SUCCESS = "POST_COMMENT_SUCCESS";
export const POST_COMMENT_FAILURE = "POST_COMMENT_FAILURE";

export const PATCH_COMMENT_REQUEST = "PATCH_POCOMMENTEQUEST";
export const PATCH_COMMENT_SUCCESS = "PATCH_POCOMMENTUCCESS";
export const PATCH_COMMENT_FAILURE = "PATCH_POCOMMENTAILURE";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

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

export const postPost = (post, token) => dispatch => {
  dispatch({ type: POST_POST_REQUEST });

  study({
    method: "post",
    url: "/posts",
    data: post,
    headers: { authorization: token }
  })
    .then(res => {
      dispatch({
        type: POST_POST_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: POST_POST_FAILURE,
        payload: { err }
      });
    });
};

export const updatePost = (postId, post, token) => dispatch => {
  dispatch({ type: PATCH_POST_REQUEST });

  study({
    method: "patch",
    url: `/posts/${postId}`,
    data: post,
    headers: { authorization: token }
  })
    .then(res => {
      dispatch({
        type: PATCH_POST_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PATCH_POST_FAILURE,
        payload: { err }
      });
    });
};

export const deletePost = (postId, token) => dispatch => {
  dispatch({ type: DELETE_POST_REQUEST });

  study({
    method: "delete",
    url: `/posts/${postId}`,
    headers: { authorization: token }
  })
    .then(res => {
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_POST_FAILURE,
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

export const postComment = (postId, comment, token) => dispatch => {
  dispatch({ type: POST_COMMENT_REQUEST });

  study({
    method: "post",
    url: `/posts/${postId}/comments`,
    data: comment,
    headers: { authorization: token }
  })
    .then(res => {
      dispatch({
        type: POST_COMMENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: POST_COMMENT_FAILURE,
        payload: { err }
      });
    });
};

export const updateComment = (
  postId,
  commentId,
  comment,
  token
) => dispatch => {
  dispatch({ type: PATCH_COMMENT_REQUEST });

  study({
    method: "patch",
    url: `/posts/${postId}/comments/${commentId}`,
    data: comment,
    headers: { authorization: token }
  })
    .then(res => {
      dispatch({
        type: PATCH_COMMENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PATCH_COMMENT_FAILURE,
        payload: { err }
      });
    });
};

export const deleteComment = (postId, commentId, token) => dispatch => {
  dispatch({ type: DELETE_COMMENT_REQUEST });

  study({
    method: "delete",
    url: `/posts/${postId}/comments/${commentId}`,
    headers: { authorization: token }
  })
    .then(res => {
      dispatch({
        type: DELETE_COMMENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_COMMENT_FAILURE,
        payload: { err }
      });
    });
};
