import {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_FAILURE,
  POST_REQUEST,
  POST_FAILURE,
  POST_SUCCESS,
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
  COMMENT_REQUEST,
  COMMENT_FAILURE,
  COMMENT_SUCCESS,
} from '../actions';

const initialState = {
  posts: [],
  post: null,
  comments: [],
  comment: null,
  fetchingPosts: false,
  fetchingPost: false,
  fetchingComments: false,
  fetchingComment: false,
  error: null,
}

export const postReducer = (state=initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        fetchingPosts: true,
      }
    case POSTS_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        posts: action.payload,
      }
    case POSTS_FAILURE:
      return {
        ...state,
        fetchingPosts: false,
        error: action.payload,
      }
    case POST_REQUEST:
      return {
        ...state,
        fetchingPost: true,
      }
    case POST_SUCCESS:
      return {
        ...state,
        fetchingPost: false,
        post: action.payload,
      }
    case POST_FAILURE:
      return {
        ...state,
        fetchingPost: false,
        error: action.payload,
      }
    case COMMENTS_REQUEST:
      return {
        ...state,
        fetchingComments: true,
      }
    case COMMENTS_SUCCESS:
      return {
        ...state,
        fetchingComments: false,
        comments: action.payload,
      }
    case COMMENTS_FAILURE:
      return {
        ...state,
        fetchingComments: false,
        error: action.payload,
      }
    case COMMENT_REQUEST:
      return {
        ...state,
        fetchingComment: true,
      }
    case COMMENT_SUCCESS:
      return {
        ...state,
        fetchingComment: false,
        comment: action.payload,
      }
    case COMMENT_FAILURE:
      return {
        ...state,
        fetchingComment: false,
        error: action.payload,
      }
    default:
      return state
  }
}