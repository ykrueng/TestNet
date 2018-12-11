import {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_FAILURE,
  POST_REQUEST,
  POST_FAILURE,
  POST_SUCCESS,
  POST_POST_REQUEST,
  POST_POST_SUCCESS,
  POST_POST_FAILURE,
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
  updatingPost: false,
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
    case POST_POST_REQUEST:
      return {
        ...state,
        updatingPost: true,
      }
    case POST_POST_SUCCESS:
      return {
        ...state,
        updatingPost: false,
        // TODO: add res to the state if needed
      }
    case POST_POST_FAILURE:
      return {
        ...state,
        updatingPost: false,
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