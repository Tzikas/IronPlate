import React, { Component } from 'react';
import {Link} from 'react-router-dom'

const Profile = (props) => {
    if(!props.user.email){ 
        props.history.push('/log-in') 
    }   
    return (
        <div>
            Welcome {props.user.email} !!! 
        </div>
    );
}

export default Profile;