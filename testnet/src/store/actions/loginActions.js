import study from "../../apis/react-study";

/*
  Authentication Action Types
*/
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const STATUS_REQUEST = "STATUS_REQUEST";
export const STATUS_SUCCESS = "STATUS_SUCCESS";
export const STATUS_FAILURE = "STATUS_FAILURE";

export const LOGOUT = "LOGOUT";

/*
  Authentication Action Creators
*/
export const register = user => dispatch => {
  dispatch({ type: REGISTER_REQUEST });

  study
    .post("/auth/register", user)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: res.token
        }
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAILURE,
        payload: { err }
      });
    });
};

export const login = user => dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  study
    .post("/auth/login", user)
    .then(res => {
      localStorage.setItem("testnet-login", res.data.token);
      localStorage.setItem("testnet-user", JSON.stringify(res.data.user));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token: res.data.token, user: res.data.user }
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { err }
      });
    });
};

export const checkStatus = () => dispatch => {
  dispatch({ type: STATUS_REQUEST });

  const token = localStorage.getItem("testnet-login");
  dispatch(
    token ? { type: STATUS_SUCCESS, payload: token } : { type: STATUS_FAILURE }
  );
};

export const logout = () => {
  localStorage.removeItem("testnet-login");
  return { type: LOGOUT };
};
