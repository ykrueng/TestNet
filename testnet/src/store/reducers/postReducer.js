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
  PATCH_POST_SUCCESS,
  PATCH_POST_FAILURE,
  PATCH_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
  COMMENT_REQUEST,
  COMMENT_FAILURE,
  COMMENT_SUCCESS,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  PATCH_COMMENT_SUCCESS,
  PATCH_COMMENT_FAILURE,
  PATCH_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST
} from "../actions";

const initialState = {
  posts: [],
  post: null,
  comments: [],
  comment: null,
  fetchingPosts: false,
  fetchingPost: false,
  addingPost: false,
  updatingPost: false,
  deletingPost: false,
  fetchingComments: false,
  fetchingComment: false,
  addingComment: false,
  updatingComment: false,
  deletingComment: false,
  error: null
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        fetchingPosts: true
      };
    case POSTS_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        posts: action.payload
      };
    case POSTS_FAILURE:
      return {
        ...state,
        fetchingPosts: false,
        error: action.payload
      };
    case POST_REQUEST:
      return {
        ...state,
        fetchingPost: true
      };
    case POST_SUCCESS:
      return {
        ...state,
        fetchingPost: false,
        post: action.payload
      };
    case POST_FAILURE:
      return {
        ...state,
        fetchingPost: false,
        error: action.payload
      };
    case POST_POST_REQUEST:
      return {
        ...state,
        addingPost: true
      };
    case POST_POST_SUCCESS:
      return {
        ...state,
        addingPost: false
      };
    case POST_POST_FAILURE:
      return {
        ...state,
        addingPost: false,
        error: action.payload
      };
    case PATCH_POST_REQUEST:
      return {
        ...state,
        updatingPost: true
      };
    case PATCH_POST_SUCCESS:
      return {
        ...state,
        updatingPost: false
      };
    case PATCH_POST_FAILURE:
      return {
        ...state,
        updatingPost: false,
        error: action.payload
      };
    case DELETE_POST_REQUEST:
      return {
        ...state,
        deletingPost: true
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deletingPost: false
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletingPost: false,
        error: action.payload
      };
    case COMMENTS_REQUEST:
      return {
        ...state,
        fetchingComments: true
      };
    case COMMENTS_SUCCESS:
      return {
        ...state,
        fetchingComments: false,
        comments: action.payload
      };
    case COMMENTS_FAILURE:
      return {
        ...state,
        fetchingComments: false,
        error: action.payload
      };
    case COMMENT_REQUEST:
      return {
        ...state,
        fetchingComment: true
      };
    case COMMENT_SUCCESS:
      return {
        ...state,
        fetchingComment: false,
        comment: action.payload
      };
    case COMMENT_FAILURE:
      return {
        ...state,
        fetchingComment: false,
        error: action.payload
      };
    case POST_COMMENT_REQUEST:
      return {
        ...state,
        addingComment: true
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        addingComment: false
      };
    case POST_COMMENT_FAILURE:
      return {
        ...state,
        addingComment: false,
        error: action.payload
      };
    case PATCH_COMMENT_REQUEST:
      return {
        ...state,
        updatingComment: true
      };
    case PATCH_COMMENT_SUCCESS:
      return {
        ...state,
        updatingComment: false
      };
    case PATCH_COMMENT_FAILURE:
      return {
        ...state,
        updatingComment: false,
        error: action.payload
      };
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        deletingComment: true
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        deletingComment: false
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deletingComment: false,
        error: action.payload
      };
    default:
      return state;
  }
};
