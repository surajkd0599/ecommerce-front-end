import React, { useState } from "react";
import classes from "./Login.module.css";
import { updateObject, checkValidity } from "../../../shared/utility";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios"

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

  const [loading, setLoading] = useState(false)

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
    setLoading(true)

    const loginData = {grant_type: "password", client_id: "live-test", client_secret: "abcde"}

    let form_data = new FormData();

    for(let key in login){
      loginData[key] = login[key].value
      console.log("LOGIN KEY : ",login[key])
      form_data.append(key, login[key].value);
    }


 for ( let key in loginData ) {
    
 }

    console.log("Login Information : ",loginData)
    console.log("Login Information form data is : ",form_data)

    axios.post("http://localhost:8080/ecommerce/oauth/token",loginData)
    .then(response => {
      console.log("Login response : ",response)
      console.log("Login response data : ",response.data)
      setLoading(false)
    }).catch(error => {
      console.log("Login error is : ",error)
      setLoading(false)
    })
  };

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.LoginData}>
      <h4>Login</h4>
      <form onSubmit={submitHandler}>
        {form}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
});

export default Login;
