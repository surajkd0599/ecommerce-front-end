import React,{useState} from "react";
import Button from "../../../components/UI/Button/Button"
import CustomerRegister from "./RolePage/CustomerRegister"
import SellerRegister from "./RolePage/SellerRegister"
import classes from "./Register.module.css"

const Register = (props) => {
    const [isRole, setIsRole] = useState(true);
  
    const switchAuthModeHandler = () => {
      setIsRole(!isRole);
    };
  
    return (
      <div className = {classes.Register}>
        {isRole ? <CustomerRegister /> : <SellerRegister /> }
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          SWITCH TO {isRole ? "SELLER" : "CUSTOMER"}
        </Button>
      </div>
    );
  };
  
  export default Register;