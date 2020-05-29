import React, { useState } from "react";
import classes from "./Form.module.css";
import { updateObject, checkValidity } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "axios"

const AddCategory = React.memo((props) => {
  const [data, setData] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter category name",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    parentId: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Enter Parent Id",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
  });

  const [loading, setLoading] = useState(false)

  const inputChangedHandler = (event, eventData) => {
    const updatedData = updateObject(data, {
      [eventData]: updateObject(data[eventData], {
        value: event.target.value,
        valid: checkValidity(event.target.value, data[eventData].validation),
        touched: true,
      }),
    });
    setData(updatedData);
  };

  const formElementsArray = [];
  for (let key in data) {
    formElementsArray.push({
      id: key,
      config: data[key],
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

    const formData = {}

    for(let key in data){
      formData[key] = data[key].value
    }

    axios.post("http://localhost:8080/ecommerce/admin/category",formData)
    .then(response => {
        console.log("metadata : ",response.data)
        alert(response.data)
      setLoading(false)
    }).catch(error => {
      console.log(" error is : ",error.response)
      alert(error.response.data.message)
      setLoading(false)
    })
  };

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.FormData}>
      <h4>Create Category</h4>
      <form onSubmit={submitHandler}>
        {form}
        <button type="submit">Create</button>
      </form>
    </div>
  );
});

export default AddCategory;