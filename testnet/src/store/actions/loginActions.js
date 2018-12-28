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

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const LOGOUT = "LOGOUT";

export const HIDE_AUTH_FORM = "HIDE_AUTH_FORM";
export const SHOW_SIGNIN_FORM = "SHOW_SIGNIN_FORM";
export const SHOW_SIGNUP_FORM = "SHOW_SIGNUP_FORM";

/*
  Authentication Action Creators
*/
export const register = user => dispatch => {
  dispatch({ type: REGISTER_REQUEST });

  study
    .post("/auth/register", user)
    .then(res => {
      localStorage.setItem("testnet-login", res.data.token);
      localStorage.setItem("testnet-user", JSON.stringify(res.data.user));
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { token: res.data.token, user: res.data.user }
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
  const user = JSON.parse(localStorage.getItem("testnet-user"));
  if (token && user) {
    dispatch({
      type: STATUS_SUCCESS,
      payload: { token: token, user: user }
    });
  } else {
    dispatch({
      type: STATUS_FAILURE
    });
  }

  // dispatch(
  //   token ? { type: STATUS_SUCCESS, payload: token } : { type: STATUS_FAILURE }
  // );
};

export const logout = () => {
  localStorage.removeItem("testnet-login");
  localStorage.removeItem("testnet-user");
  return { type: LOGOUT };
};

export const updateUser = (update, token) => dispatch => {
  dispatch({ type: UPDATE_USER_REQUEST });
  study({
    method: "patch",
    url: `/auth/update`,
    headers: { Authorization: token },
    data: update,
  })
    .then(res => {
      if (res.data.user.username) {
        let newUser = JSON.parse(
          localStorage.getItem("testnet-user")
        );
        newUser.username = res.data.user.username;
        localStorage.setItem("testnet-user", JSON.stringify(newUser));
      }
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { username: res.data.user.username }
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { err }
      });
    });
}

export const toggleAuthForm= (type) => {
  if (type === 'cancel') return { type: HIDE_AUTH_FORM };
  if (type === 'signin') return { type: SHOW_SIGNIN_FORM };
  return { type: SHOW_SIGNUP_FORM };
}