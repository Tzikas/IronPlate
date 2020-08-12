import React from "react";
import actions from "../../api/index";
import { GoogleLogin } from "react-google-login";

const responseGoogle = ({setUser, history}) => {
  const onResponse = (response) => {
    console.log(response);
    const user = {
      ...response.profileObj,
      password: response.profileObj?.googleId,
    };
    actions
      .signUp(user)
      .then((user) => {
        setUser({ ...user?.data });
        history.push("profile")

      })
      .catch( response => { 
        // alert(response.message)
        console.error(response)

        throw new Error({err:'response'})
    });
    
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLEID}
      buttonText="Signup"
      onSuccess={onResponse}
      onFailure={onResponse}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default responseGoogle;
