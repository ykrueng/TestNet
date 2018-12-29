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
  HIDE_AUTH_FORM,
  SHOW_SIGNIN_FORM,
  SHOW_SIGNUP_FORM,
} from "../actions";

const initialState = {
  user: {},
  modal: false,
  signInModal: true,
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
        registering: true,
        registrationError: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loginError: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        modal: false,
        signInModal: true,
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
        modal: false,
        signInModal: true,
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
        ...state,
        loggingIn: false,
        registering: false,
        loginError: true,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loggingIn: false,
        registering: false,
        registrationError: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: {},
        token: null,
        modal: false,
        signInModal: true,
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
    case HIDE_AUTH_FORM:
      return {
        ...state,
        modal: false,
        signInModal: true,
        loginError: false,
        registrationError: false,
      }
    case SHOW_SIGNIN_FORM:
      return {
        ...state,
        modal: true,
        signInModal: true,
      }
    case SHOW_SIGNUP_FORM:
      return {
        ...state,
        modal: true,
        signInModal: false,
      }
    default:
      return state;
  }
};
