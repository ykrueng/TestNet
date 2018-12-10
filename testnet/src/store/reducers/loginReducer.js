import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions'

const initialState = {
  loggedIn: false,
  token: null,
  registering: false,
  logingIn: false,
  error: null,
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
        token: action.payload.token,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        token: action.payload.token,
      }
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        loggingIn: false,
        registering: false,
        error: action.payload,
      }
    default:
      return state
  }
}