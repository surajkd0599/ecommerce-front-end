import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Home
    </NavigationItem>

    <NavigationItem link="/admin" active>
      UserInfo
    </NavigationItem>

    <NavigationItem link="/profileImage" active>
      UploadImage
    </NavigationItem>

    <NavigationItem link="/addMetaData" active>
      MetaData
    </NavigationItem>

    <NavigationItem link="/getMetaData" active>
      MetaDataView
    </NavigationItem>


    <NavigationItem link="/addCategory" active>
      AddCategory
    </NavigationItem>

    <NavigationItem link="/value" active>
      AddValue
    </NavigationItem>

    <NavigationItem link="/getCategory" active>
      GetCategory
    </NavigationItem>


 <NavigationItem link="/forgotPassword" active>
      ForgotPassword
    </NavigationItem>
    <NavigationItem link="/resetPassword" active>
      ResetPassword
    </NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Auth</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
