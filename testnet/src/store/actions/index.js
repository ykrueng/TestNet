import study from '../../apis/react-study';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const register = (user) =>
  dispatch => {
    dispatch({ type: REGISTER_REQUEST });

    study
      .post('/auth/register', user)
      .then( res => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            token: res.token,
          }
        })
      })
      .catch( err => {
        dispatch({
          type: REGISTER_FAILURE,
          payload: { err }
        })
      })
  }

export const login = (user) =>
  dispatch => {
    dispatch({ type: LOGIN_REQUEST });

    study
      .post('/auth/login', user)
      .then( res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { token: res.token }
        })
      })
      .catch( err => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: { err }
        })
      })
  }