import React, { Fragment, useEffect, useState } from 'react';
import TheContext from '../../TheContext'
import actions from '../../api'

const Profile = (props) => {
    
    const [posts, setPosts] = useState([])
      useEffect(() => { 
        actions.getMyPosts()
          .then(posts => {
            console.log(posts)
           setPosts(posts.data.reverse())
          })
          .catch(err => console.error(err))      
      }, [])

    return (
        <div>
            <Welcome />  {/*'Look ma!  No props!!!'*/}
            <AddPost />
            <MyPosts posts={posts}/>
        </div>
    );
}

function MyPosts({posts}){
    return posts.map(eachPost => (
        <Fragment key={Math.random()}>
    
          <li >
            <img src={eachPost.user?.imageUrl} />
            <div>{eachPost.user?.name} needs you help</div>
            <div>{eachPost.message}</div>
    
    
          </li>
          <div>{eachPost.time}</div>
    
        </Fragment>
    ))
}


const AddPost = () => {
    const [message, setMessage] = useState("")
    
    const handleSubmit = e => {
        e.preventDefault();
        actions.addPost({message}).then(res => console.log(res)).catch(err=> console.error(err))

    }
    return ( 
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setMessage(e.target.value)} type="text" />
            <button>Add</button>
        </form>
    )
}



const Welcome = () => {
    
    const user = React.useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 
    
    return (
        <Fragment>
            <img src={user?.imageUrl} />
            <div>Welcome {user?.email} </div>

        </Fragment>
    )
}

export default Profile;