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
} from '../actions';

const initialState = {
  loggedIn: false,
  token: null,
  registering: false,
  logingIn: false,
  checkingStatus: false,
  error: null,
  loginError: false,
}

export const loginReducer = (state=initialState, action) => {
  switch(action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        loggedIn: true,
        loginError: false,
        token: action.payload.token,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        loginError: false,
        token: action.payload.token,
      }
    case STATUS_REQUEST:
      return {
        ...state,
        checkingStatus: true,
      }
    case STATUS_SUCCESS:
      return {
        ...state,
        checkingStatus: false,
        token: action.payload.token,
        loggedIn:true,
      }
    case STATUS_FAILURE:
      return {
        ...state,
        checkingStatus: false,
        loggedIn: false,
        token: null,
      }
    case LOGIN_FAILURE:
      return {
        loggingIn: false,
        registering: false,
        loginError: true,
      }
    case REGISTER_FAILURE:
      return {
        loggingIn: false,
        registering: false,
        error: action.payload,
      }
    default:
      return state
  }
}