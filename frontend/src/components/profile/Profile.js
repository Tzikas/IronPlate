import React, { Fragment, useEffect, useState } from 'react';
import TheContext from '../../TheContext'
import actions from '../../api'

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
            <AddPost {...props} />
            <MyPosts posts={posts}/>
            <OthersPosts posts={otherPosts} />
        </div>
    );
}

function MyPosts({posts}){
    console.log(posts)

    let rows = posts.map(eachPost => (
        <Fragment key={Math.random()}>
    
          <li >
            <img src={eachPost.user?.imageUrl} />
            <div>{eachPost.user?.name} needs you help</div>
            <div>{eachPost.message}</div>
    
    
          </li>
          <div>{eachPost.time}</div>
    
        </Fragment>
    ))

    rows.unshift(
        React.createElement('h2', null, 'My Requests For Help')
    )
    return rows
}


function OthersPosts({posts}){
    console.log(posts)
    let rows = posts.map(eachPost => (
        <Fragment key={Math.random()}>
    
          <li >
            <img src={eachPost.user?.imageUrl} />
            <div>{eachPost.user?.name} needs you help</div>
            <div>{eachPost.message}</div>
    
    
          </li>
          <div>{eachPost.time}</div>
    
        </Fragment>
    ))
    rows.unshift(
        React.createElement('h2', null, 'Im helping these posts')
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
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setMessage(e.target.value)} type="text" />
            <button>Add</button>
        </form>
    )
}



const Welcome = () => {
    
    const {user, history} = React.useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 
    return (
        <Fragment>
            <img src={user?.imageUrl} />
            <div onClick={() => history.push('/')}>Welcome {user?.email} </div>

        </Fragment>
    )
}

export default Profile;