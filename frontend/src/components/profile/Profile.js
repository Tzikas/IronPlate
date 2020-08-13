import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import TheContext from '../../TheContext'
import actions from '../../api'
import moment from 'moment'

const Profile = (props) => {
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
            <AddPost {...props} posts={posts} />
            <MyPosts posts={posts} setPosts={setPosts}/>
            <OthersPosts posts={otherPosts} />
             
        </div>
    );
}

function MyPosts({posts, setPosts}){

    let rows = posts.map((post, i)=> <EachMyPost key={post._id} post={post} posts={posts} setPosts={setPosts} i={i}/>)

    rows.unshift(
        React.createElement('h2', {key:'help you'}, 'I need help with:')
    )
    return rows
}


function EachMyPost({post, posts, setPosts, i}){
    const [resolve, setResolve] = useState(post.resolved)
    let {user, setUser} = useContext(TheContext)
    const resolvePost = (val) => (event) => {
        actions.resolvePost({post, resolved:val}).then(res => {
            setResolve(val)
            let newPosts = [...posts]
            newPosts[i] = res.data.posted
            setPosts(newPosts)
            setUser(res.data.helpee)                        
        }).catch(err => console.error(err))
    }
    return (
        <li key={post._id}>
            <div>{post.message}  <i>{post.bounty}</i> <i><img src={post.helper?.imageUrl} /> {post.helper?.name}</i> </div>
                {post.helper?
                    resolve ? 
                        <button onClick={resolvePost(false)}>Not Resolved</button>
                        : 
                        <button onClick={resolvePost(true)}>Resolved</button>
                 : null}
        </li>
    )
}


function OthersPosts({posts}){
    let rows = posts.map(eachPost => (
    
          <li key={eachPost._id}>
            <div>{eachPost.message}  
                <i>{eachPost.bounty}</i> 
                <i><img src={eachPost.user?.imageUrl} /></i> 
                <i>Created {moment(eachPost.createdAt).format('h:mm:ss a')}</i>
                <i>Last updated {moment(eachPost.updatedAt).format('h:mm:ss a')}</i>
            </div>
           
            <div>You're helping {eachPost.user?.name}</div>
    
          

          </li>
    
    ))
    rows.unshift(
        React.createElement('h2', {key:'help me'}, 'Im helping:')
    )
    return rows
}



const AddPost = ({history, posts}) => {
    const [message, setMessage] = useState("")
    
    let {user} = React.useContext(TheContext); 

    //See if there is enough points to ask a question
    let totalPointsSpent = posts.reduce((acc,post) => {
        if(!post.resolved)
            return acc += post.bounty
        else 
            return acc
    }, 0)
    let outOfPoints = user?.points - totalPointsSpent <= 0



    const handleSubmit = e => {
        e.preventDefault();

        actions.addPost({message}).then(res => { 
            history.push('/')
        }).catch(err=> console.error(err))

    }


    return ( 
        <Fragment>
                    
            <form  id="askForHelp" onSubmit={handleSubmit}>
                <input  disabled={outOfPoints} onChange={(e) => setMessage(e.target.value)} placeholder={outOfPoints? "Sorry your out of points" : "Ask for help"} type="text" />
                <button disabled={outOfPoints}>Add</button>
            
            </form>
        </Fragment>

    )
}



const Welcome = () => {
    
    let {user, history} = React.useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 

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