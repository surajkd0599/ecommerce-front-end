import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Admin from "./containers/Admin/Admin";
import Address from "./containers/Address/Address";
import ForgotPassword from "./containers/Password/ForgorPassword";
import ResetPassword from "./containers/Password/ResetPassword"
import UserProfile from "./containers/Image/UserProfile";
import MetaDataField from "./containers/Category/MetaDataField";
import MetaDataFields from "./containers/Category/MetaDataView";
import AddCategory from "./containers/Category/AddCategory";
import MetaDataFieldValueMain from "./containers/Category/MetaDataFieldValues/MetaDataFieldValueMain";
import GetCategory from "./containers/Category/GetCategory";
import CustomerRegister from "./containers/Auth/Register/RolePage/CustomerRegister";
import SellerRegister from "./containers/Auth/Register/RolePage/SellerRegister";
import Register from "./containers/Auth/Register/Register";
import Login from "./containers/Auth/Login/Login";
import AddressForm from "./containers/Address/Form/AddressForm";
import ViewCategory from "./containers/Category/ViewCategory";

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const App = (props) => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/sign-in" component={Login} />
      <Route path="/sign-up" component={Register} />
      <Route path="/sign-up/customer" component={CustomerRegister} />
      <Route path="/sign-up/seller" component={SellerRegister} />
      <Route path="/" exact component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/address" component = {AddressForm} />
      <Route path="/viewCategory" component = {ViewCategory} />

      <Route path="/forgotPassword" component= {ForgotPassword} />
      <Route path="/resetPassword" component= {ResetPassword} />
      <Route path="/profileImage" component= {UserProfile} />
      <Route path="/addMetaData" component= {MetaDataField} />
      <Route path="/getMetaData" component= {MetaDataFields} />
      <Route path="/addCategory" component= {AddCategory} />
      <Route path="/value" component= {MetaDataFieldValueMain} />
      <Route path="/getCategory" component= {GetCategory} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
