import React, { Component } from 'react';
import TheContext from '../../TheContext'

const Profile = (props) => {
    return (
        <div>
            Profile Page
            <Welcome />  {/*'Look ma!  No props!!!'*/}
        </div>
    );
}


const Welcome = () => {
    
    const user = React.useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 
    
    return (
        <div>Welcome {user?.email} <img src={user?.imageUrl} /></div>
    )
}

export default Profile;