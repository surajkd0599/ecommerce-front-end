import React, { useState } from "react";
import axios from "axios";

const UserProfile = (props) => {
  const [profile, setProfile] = useState(null);
  const [loaded, setLoaded] = useState();

  const onChangeHandler = (event) => {
      console.log("Uploaded imAGE Is : ",event.target.files[0])
    setProfile(event.target.files[0]);
    setLoaded(0);
  };

  const onClickHandler = () => {

    axios.post("http://localhost:8080/ecommerce/image/4",profile)
    .then(response => {
        console.log(response)
    }).catch(error => {console.log(error)})
    
}

  console.log("Profile is : ",profile)
  return (
    <form>
      <div>
        <label>Upload your profile image</label>
        <input type="file" name = "file" onChange = {onChangeHandler} />
      </div>
      <button type="button" onClick={onClickHandler}>Upload</button> 
    </form>
  );
};

export default UserProfile;
