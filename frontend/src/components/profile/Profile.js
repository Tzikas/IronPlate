import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import TheContext from '../../TheContext'
import actions from '../../api'

const Profile = (props) => {
    console.log(props)
    const [posts, setPosts] = useState([])
    const [otherPosts, setOtherPosts] = useState([])
      useEffect(() => { 

        //Get my posts 
        actions.getMyPosts().then(posts => {
           if(posts)
            setPosts(posts.data.reverse())
          }).catch(err => console.error(err))     

        //Get other posts
        actions.getOtherPosts().then(posts => {
           if(posts)
            setOtherPosts(posts.data.reverse())
          }).catch(err => console.error(err))    

      }, [])
  
    return (
        <div>
            
            <Welcome />  {/*'Look ma!  No props!!!'*/}
            <AddPost {...props} />
            <MyPosts posts={posts}/>
            <OthersPosts posts={otherPosts} />
             
        </div>
    );
}

function MyPosts({posts}){

    let rows = posts.map(post => <EachMyPost key={post._id} {...post} />)

    rows.unshift(
        React.createElement('h2', {key:'help you'}, 'I need help with:')
    )
    return rows
}


function EachMyPost(post){
    const [resolve, setResolve] = useState(post.resolved)
    let {user, setUser} = useContext(TheContext)

    const resolvePost = (val) => (event) => {
        actions.resolvePost({post, resolved:val}).then(res => {
            setResolve(val)
            setUser(res.data.helpee)                        
        }).catch(err => console.error(err))
    }
    return (
        <li key={post._id}>
            <div>{post.message}  <i>{post.bounty}</i></div>
                { resolve ? 
                    <button onClick={resolvePost(false)}>Not Resolved</button>
                    : 
                    <button onClick={resolvePost(true)}>Resolved</button>
                }
        </li>
    )
}


function OthersPosts({posts}){
    let rows = posts.map(eachPost => (
    
          <li key={eachPost._id}>
            <img src={eachPost.user?.imageUrl} />
            <div>{eachPost.user?.name} needs you help</div>
            <div>{eachPost.message}</div>
    
            <div>{eachPost.time}</div>

          </li>
    
    ))
    rows.unshift(
        React.createElement('h2', {key:'help me'}, 'Im helping:')
    )
    return rows
}



const AddPost = ({history}) => {
    const [message, setMessage] = useState("")
    
    const handleSubmit = e => {
        e.preventDefault();
        actions.addPost({message}).then(res => { 
            history.push('/')
        }).catch(err=> console.error(err))

    }
    return ( 
        <form id="askForHelp" onSubmit={handleSubmit}>
            <input onChange={(e) => setMessage(e.target.value)} placeholder="Ask for help" type="text" />
            <button>Add</button>
        </form>
    )
}



const Welcome = () => {
    
    let {user, history} = React.useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 
    console.log(user)

    if (!user) {
        return <Redirect to='/'/>;
    }
    return (
        <div className="profile">
            <img src={user?.imageUrl} />
            <div onClick={() => history.push('/')}>Welcome {user?.name} </div>
            <div>{user?.points} Points</div>
        </div>
    )
}



function notifyMe(message) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(message);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(message);
        }
      });
    }
  
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
  }


export default Profile;