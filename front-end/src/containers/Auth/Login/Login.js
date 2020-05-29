import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import { updateObject, checkValidity } from "../../../shared/utility";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"
import * as actions from "../../../store/actions/index"

const Login = React.memo((props) => {

  const [login, setLogin] = useState({
    username: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Enter your E-mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      isValid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Enter your Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 15,
      },
      isValid: false,
      touched: false,
    },
  });

  const { authRedirectPath, onAuthRedirect } = props;

  useEffect(() => {
    if (authRedirectPath !== "/") {
      onAuthRedirect();
    }
  }, [authRedirectPath,  onAuthRedirect]);

  const inputChangedHandler = (event, loginData) => {
    const updatedSchedules = updateObject(login, {
      [loginData]: updateObject(login[loginData], {
        value: event.target.value,
        valid: checkValidity(event.target.value, login[loginData].validation),
        touched: true,
      }),
    });
    setLogin(updatedSchedules);
  };

  const formElementsArray = [];
  for (let key in login) {
    formElementsArray.push({
      id: key,
      config: login[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  const submitHandler = (event) => {
    event.preventDefault();
    //props.onAuth(login.username.value, login.password.value)
    props.onAuth(login)
  };

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.LoginData}>
      <h4>Login</h4>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (login) =>
      dispatch(actions.auth(login)),
    onAuthRedirect: () => dispatch(actions.authRedirect("/")),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);
