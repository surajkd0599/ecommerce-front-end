import React, { useState, useCallback } from "react";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Aux from "../../../hoc/Aux/aux";
import MetaDataFieldValue from "./MetaDataFieldValues";
import axios from "axios"

const CustomerRegister = (props) => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState([]);

  const addValueHandler = useCallback((value) => {
    console.log("Added Value is", value);
    setValues((prevValues) => [...prevValues, { ...value }]);
  }, []);

  console.log("Values are : ",values)

  const submitHandler = (event) => {
    console.log("In submit block");
    event.preventDefault();
    setLoading(true);
    console.log("Values are: ", values);

    const addedValues = [];

    let categoryId = null

    for (let add in values) {
      const add1 = {};
      const valueData = values[add];
      console.log("Value is", valueData);
      for (let key in values[add]) {
        add1[key] = valueData[key].value;
        if(key === "categoryId"){
          categoryId = valueData[key].value
        }
      }
      addedValues.push(add1);
    }

    console.log("Category Id is : ",categoryId)

    console.log("Added values is", addedValues);

    let url = "http://localhost:8080/ecommerce/admin/category/"+categoryId
    axios
      .post(url, addedValues)
      .then((response) => {
        alert(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log("Error is", error);
        alert(error.response.data.message)
        setLoading(false)
      });
  };

  let form = <MetaDataFieldValue onAddValues={addValueHandler} />;

  if (loading) {
    form = <Spinner />;
  }

  return (
    <Aux>
      <div>
        {form}
        <form onSubmit={submitHandler}>
          <div style={{ textAlign: "center" }}>
            <Button btnType="Success">Submit</Button>
          </div>
        </form>
      </div>
    </Aux>
  );
};

export default CustomerRegister;
