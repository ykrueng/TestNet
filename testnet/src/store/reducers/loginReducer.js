import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE,
  LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../actions";

const initialState = {
  user: {},
  loggedIn: false,
  token: null,
  registering: false,
  logingIn: false,
  checkingStatus: false,
  registrationError: null,
  loginError: false,
  updatingUser: false,
  updateError: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registering: true
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        loggedIn: true,
        loginError: false,
        registrationError: false,
        token: action.payload.token,
        user: action.payload.user
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        loginError: false,
        registrationError: false,
        token: action.payload.token,
        user: action.payload.user
      };
    case STATUS_REQUEST:
      return {
        ...state,
        checkingStatus: true
      };
    case STATUS_SUCCESS:
      return {
        ...state,
        checkingStatus: false,
        token: action.payload.token,
        user: action.payload.user,
        loggedIn: true
      };
    case STATUS_FAILURE:
      return {
        ...state,
        checkingStatus: false,
        loggedIn: false,
        token: null,
        user: {}
      };
    case LOGIN_FAILURE:
      return {
        loggingIn: false,
        registering: false,
        loginError: true
      };
    case REGISTER_FAILURE:
      return {
        loggingIn: false,
        registering: false,
        registrationError: action.payload
      };
    case LOGOUT:
      return {
        loggedIn: false,
        token: null
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        updatingUser: true,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updatingUser: false,
        user: {
          ...state.user,
          username: action.payload.username || state.user.username,
        }
      }
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        updatingUser: false,
        updateError: action.payload,
      }
    default:
      return state;
  }
};
