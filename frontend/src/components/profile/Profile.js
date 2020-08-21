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
    
    const { user, setUser, history } = React.useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 
    console.log(history)
    return (
        <div>Welcome {user?.email} <img src={user?.imageUrl} />
            <button onClick={()=>history.push("/")}>Home</button>
        </div>
    )
}

export default Profile;