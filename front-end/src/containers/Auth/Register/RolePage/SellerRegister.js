import React, { useState, useCallback } from "react";
import classes from "./Register.module.css";
import { updateObject, checkValidity } from "../../../../shared/utility";
import Input from "../../../../components/UI/Input/Input";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Button from "../../../../components/UI/Button/Button";
import AddressForm from "../../../Address/Form/AddressForm";
import axios from "axios";
import Aux from "../../../../hoc/Aux/aux";

const SellerRegister = (props) => {
  const [register, setRegister] = useState({
    // registerAs: {
    //   elementType: "select",
    //   elementConfig: {
    //     options: [
    //       { value: "none", displayValue: "SELECT ROLE" },
    //       { value: "sell", displayValue: "Seller" },
    //       { value: "cust", displayValue: "Customer" },
    //     ],
    //   },
    //   validation: {},
    //   value: "none",
    //   isValid: true,
    // },
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your UserName",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    firstName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your FirstName",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    lastName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your LastName",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    companyName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your Company Name",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    companyContact: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your Company Contact",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    gst: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your GST number",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    email: {
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
    confirmPassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm your Password",
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
    age: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter your Age",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    dateOfBirth: {
      elementType: "input",
      elementConfig: {
        type: "date",
        placeholder: "Enter your Birth date",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    gender: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "none", displayValue: "SELECT GENDER" },
          { value: "male", displayValue: "Male" },
          { value: "female", displayValue: "Female" },
        ],
      },
      validation: {},
      value: "none",
      isValid: true,
    },
  });

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);

  const inputChangedHandler = (event, registerData) => {
    const updatedSchedules = updateObject(register, {
      [registerData]: updateObject(register[registerData], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          register[registerData].validation
        ),
        touched: true,
      }),
    });
    setRegister(updatedSchedules);
  };

  const formElementsArray = [];
  for (let key in register) {
    formElementsArray.push({
      id: key,
      config: register[key],
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

  const addAddressHandler = useCallback((add) => {
    console.log("Added Address is", add);
    setAddress((prevAddress) => [...prevAddress, { ...add }]);
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    const addresses = [];

    for (let add in address) {
      const add1 = {};
      const addressData = address[add];
      console.log("Address is", addressData);
      for (let key in address[add]) {
        add1[key] = addressData[key].value;
      }
      addresses.push(add1);
    }

    const registerData = { accountNonLocked: true };

    for (let key in register) {
      registerData[key] = register[key].value;
    }

    console.log("registered data is", registerData);
    console.log("Registered as,", register.registerAs.value);
    let responseData = null;
    if (register.registerAs.value === "emp") {
      console.log("In employe block");
      responseData = axios.post(
        "http://localhost:8080/ecommerce/auth/customer",
        registerData
      );
    } else {
      responseData = axios.post(
        "http://localhost:8080/college/auth/seller",
        registerData
      );
    }
    responseData
      .then((response) => {
        setLoading(false);
        console.log("Registered data response is", response);
        alert(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error is", error);
      });
  };

  if (loading) {
    form = <Spinner />;
  }

  return (
    <Aux  style={{ textAlign: "center" }}>
      <div className={classes.RegisterData}>
        <h4>Seller Register</h4>
        <form onSubmit={submitHandler}>{form}</form>
      </div>
      <div>
        <AddressForm onAddAddress={addAddressHandler} role={"SELLER"} />
      </div>
      <Button btnType="Success">Submit</Button>
    </Aux>
  );
};

export default SellerRegister;
