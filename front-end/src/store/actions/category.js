import * as actionTypes from "./actionTypes";
import axios from "axios";


export const fetchCategoriesSuccess = (categories) => {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    categories: categories,
  };
};

export const fetchCategoriesFail = (error) => {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAIL,
    error: error,
  };
};

export const fetchCategoriesStart = () => {
  return {
    type: actionTypes.FETCH_CATEGORIES_START,
  };
};

export const fetchCategories = () => {
  return (dispatch) => {
    dispatch(fetchCategoriesStart());
    axios
      .get("http://localhost:8080/ecommerce/admin/category")
      .then((res) => {
        console.log("Fetched category is : ",res.data)
        dispatch(fetchCategoriesSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchCategoriesFail(error));
      });
  };
};
