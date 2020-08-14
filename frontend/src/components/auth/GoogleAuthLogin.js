import React from "react";
import actions from "../../api/index";
import { GoogleLogin } from "react-google-login";
import TheContext from '../../TheContext'

const responseGoogle = ({history, setUser}) => {

  const onResponse = (response) => {

    console.log(response);
    const user = {
      ...response.profileObj,
      password: response.profileObj?.googleId,
    };
    actions
      .logIn(user)
      .then((user) => {
        if(user){
          setUser({ ...user?.data })
          history.push("profile")            
        }
      })
      .catch( response => console.error(response));
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLEID}
      buttonText="Login"
      onSuccess={onResponse}
      onFailure={onResponse}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default responseGoogle;
