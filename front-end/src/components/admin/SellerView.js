import React, { useState } from "react";
import classes from "./UserView.module.css";
import Button from "../UI/Button/Button";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";

const SellerView = (props) => {
  console.log("Props in list is", props);
  console.log("In Period list");
  const [loading, setLoading] = useState(false);

  const activateUserHandler = (userId) => {
    setLoading(true);
    console.log("UserId received is ; ", userId);

    axios
      .patch(
        "http://localhost:8080/ecommerce/admin/activateSeller/" + userId
      )
      .then((response) => {
        setLoading(false);
        alert(response.data);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.data);
        console.log("Error is", error.data);
      });
  };

  const deActivateUserHandler = (userId) => {
    setLoading(true);
    console.log("UserId received is ; ", userId);
    axios
      .patch(
        "http://localhost:8080/ecommerce/admin/deActivateSeller/" + userId
      )
      .then((response) => {
        setLoading(false);
        alert(response.data);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error is", error);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className={classes.UserView}>
      <h4>Fetched Users</h4>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Company Contact</th>
            <th>Company Name</th>
            <th>Active</th>
            <th>Activate</th>
            <th>DeActivate</th>
          </tr>
        </thead>
        <tbody>
          {props.fetchedUsers.map((user,count) => (
            <tr key={user.id}>
              <td key={user.id}>{count + 1}</td>

              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.companyContact}</td>
              <td>{user.companyName}</td>
              <td>{String(user.active)}</td>
              <td>
                <Button
                  clicked={() => activateUserHandler(user.id)}
                  btnType="Success"
                >
                  Activate
                </Button>
              </td>
              <td>
                <Button
                  clicked={() => deActivateUserHandler(user.id)}
                  btnType="Danger"
                >
                  DeActivate
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SellerView;
