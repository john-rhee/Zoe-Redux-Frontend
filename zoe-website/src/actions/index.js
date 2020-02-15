import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

export const USER_LOGING_IN = "USER_LOGING_IN";
export const USER_LOGING_IN_SUCCESS = "USER_LOGING_IN_SUCCESS";
export const USER_LOGING_IN_FAILURE = "USER_LOGING_IN_FAILURE";

export const login = loginData => dispatch => {
    dispatch({ type: USER_LOGING_IN });
  
    axiosWithAuth()
      .post('/user/login', loginData)
      .then(response =>
        dispatch(
          { type: USER_LOGING_IN_SUCCESS, payload: response.data },
          localStorage.setItem("token", response.data.token)
        )
      )
      .catch(err =>
        dispatch({ type: USER_LOGING_IN_FAILURE, payload: err.response })
      );
};

export const USER_SIGNING = "USER_SIGNING";
export const USER_SIGNING_SUCCESS = "USER_SIGNING_SUCCESS";
export const USER_SIGNING_FAILURE = "USER_SIGNING_FAILURE";

export const signUp = signUpData => dispatch => {
    dispatch({ type: USER_SIGNING });
  
    axiosWithAuth()
      .post('/user/register ', signUpData)
      .then(response =>
        dispatch(
          { type: USER_SIGNING_SUCCESS, payload: response.data.user },
          localStorage.setItem("token", response.data.token)
        )
      )
      .catch(err =>
        dispatch({ type: USER_SIGNING_FAILURE, payload: err.response })
      );
};

export const PIC_POSTING = "PIC_POSTING";
export const PIC_POSTING_SUCCESS = "PIC_POSTING_SUCCESS";
export const PIC_POSTING_FAILURE = "PIC_POSTING_FAILURE";

export const uploadPic = picData => dispatch => {
  dispatch({ type: PIC_POSTING });

  axios()
    .post('/picture/upload', picData )
    .then(response =>
      dispatch(
        { type: USER_LOGING_IN_SUCCESS, payload: response.path }
      )
    )
    .catch(err =>
      dispatch({ type: USER_LOGING_IN_FAILURE, payload: err.response })
    );
};