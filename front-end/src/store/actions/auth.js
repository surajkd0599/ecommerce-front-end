import * as actionTypes from "./actionTypes";
import axios from "axios";
import qs from "qs"

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId")
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (login) => {
  return (dispatch) => {
    dispatch(authStart());

    console.log("Login info is :" , login)
    const loginData = {grant_type: "password", client_id: "live-test", client_secret: "abcde"}

    for(let key in login){
      loginData[key] = login[key].value
    }




    console.log("Login Information : ",loginData)

    axios
      .post("http://localhost:8080/ecommerce/login",qs.stringify(loginData))
      .then((response) => {
        console.log(response);
        console.log(response.data);
         const expirationDate = new Date(
           new Date().getTime() + response.data.expiresIn * 1000
         );
         localStorage.setItem("Authorization", "Bearer "+response.data.access_token);
         localStorage.setItem("expirationDate", expirationDate);
         localStorage.setItem("Authorization","Bearer "+response.data.refresh_token);
        // dispatch(authSuccess(response.data.idToken, response.data.localId));
         dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authRedirect = (path) => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        //const userId = localStorage.getItem("userId");
        //dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000)
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
