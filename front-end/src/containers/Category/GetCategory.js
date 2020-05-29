import React, { useEffect } from "react"
import axios from "../../axios-ecommerce"
import { connect } from "react-redux"
import Spinner from "../../components/UI/Spinner/Spinner"
import * as actions from "../../store/actions/index"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import CategoryView from "../../components/category/CategoriesView"

const GetCategory = (props) => {
    const { onFetchCategories } = props
    useEffect(() => {
      onFetchCategories();
    }, [onFetchCategories]);

    console.log("Category come in props is : ",props.categories)
  
    let categories = <Spinner />;
    if (!props.loading) {
      categories = <CategoryView passedCategories = {props.categories}/>
    }
    return <div>{categories}</div>;
  };
  
  const mapStateToProps = (state) => {
    return {
      categories: state.category.categories,
      loading: state.category.loading,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onFetchCategories: () =>
        dispatch(actions.fetchCategories()),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withErrorHandler(GetCategory, axios));
  