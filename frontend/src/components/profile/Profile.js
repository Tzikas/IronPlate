import React, { Component } from 'react';

const Profile = (props) => {
    console.log(props)

    if(!props?.user){ //FIX ME
        props.history.push('/log-in') 
    }   
    return (
        <div>
            Profile
            Welcome {props?.user?.email} <img src={props?.user?.imageUrl} />!!! 
        </div>
    );
}

export default Profile;