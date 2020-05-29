import React,{useState} from "react";
import Button from "../../../components/UI/Button/Button"
import CustomerRegister from "./RolePage/CustomerRegister"
import SellerRegister from "./RolePage/SellerRegister"
import classes from "./Register.module.css"
import { Link } from "react-router-dom";

const Register = (props) => {
    const [isRole, setIsRole] = useState(true);
  
    const switchAuthModeHandler = () => {
      setIsRole(!isRole);
    };
  
    return (
      <div className = {classes.Register}>
        {isRole ? <CustomerRegister /> : <SellerRegister /> }
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          SWITCH TO {isRole ? <Link to = "auht/sign-up/seller">SELLER</Link> :<Link to = "auth/sign-up/customer">CUSTOMER</Link>}
        </Button>
      </div>
    );
  };
  
  export default Register;