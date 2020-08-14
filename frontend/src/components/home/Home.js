import React, { Fragment, Component, useState, useEffect } from 'react';
import TheContext from '../../TheContext'
import Scheduler from './Scheduler'

import actions from '../../api/index'

const EachPost = ( post ) => {
  const {user} = React.useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 
  let yours = post?.user._id === user?._id

  const [modalIsOpen,setIsOpen] = React.useState(false);


  let areYouTheHelper =  post?.helper?._id === user?._id

  let isThereAnotherHelper = post?.helper && !areYouTheHelper

  let [helped, setHelped] = useState(areYouTheHelper || isThereAnotherHelper)


  const help = (val) => (event) => {
    actions.helpUser({post, help:val}).then(res => {
      if(res)  
        setHelped(val)
      
      if(val)
        setIsOpen(true);

    }).catch(err => console.error(err))

  }


  return (
    <div>
      
      {helped? 
        <button disabled={isThereAnotherHelper || yours || !user?._id} onClick={help(false)}>Nevermind <h2> 🛑</h2></button>
        :
        <button disabled={isThereAnotherHelper || yours || !user?._id} onClick={help(true)}>I got you <h2> 👍</h2></button>

      }

      <Scheduler modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} user={user} post={post}/>

    </div>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([])
  console.log(posts)
  useEffect(() => { 
    actions.getAllPosts()
      .then(posts => {
        setPosts(posts.data.reverse())
      })
      .catch(err => console.error(err))      
  }, [])



  return posts.map(eachPost => (
    <Fragment key={Math.random()}>

      <li className="post">
        <img src={eachPost.user?.imageUrl} />
        <div className="details">
          { eachPost.helper ? 
             eachPost.resolved ? 
               <i>{eachPost.user?.name}'s issue was resolved by {eachPost.helper?.name} </i>
              : 
              <i>{eachPost.user?.name} is being helped by {eachPost.helper?.name} </i>            
            : 
            <i>{eachPost.user?.name} needs your help</i>

          }
          <div>"{eachPost.message}"</div>
          <i>{eachPost.bounty} Points</i>
        </div>
        <EachPost {...eachPost} />

      </li>
      {/* <div>{eachPost.time}</div> */}

    </Fragment>

  ))
}




const Home = (props) => {

  const changeFruit = () => {

  }

  return (
    <div>
      <Posts />

    </div>
  )
}

export default Home;



