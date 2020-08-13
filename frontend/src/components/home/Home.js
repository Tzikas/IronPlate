import React, { Fragment, Component, useState, useEffect } from 'react';
import TheContext from '../../TheContext'

import actions from '../../api/index'

const EachPost = ( post ) => {
  let [calendly, setCalendly] = useState(false)
  let {user} = React.useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 
  let yours = post?.user._id === user?._id

  // let open = false;
  // if(!post?.helper || !yours )
  //   open = true 


  let areYouTheHelper =  post?.helper === user?._id

  let isThereAnotherHelper = post?.helper && !areYouTheHelper

  let [helped, setHelped] = useState(areYouTheHelper || isThereAnotherHelper)


  const help = (val) => (event) => {
    actions.helpUser({post, help:val}).then(res => {
      console.log(val, res)
      if(res)
        setHelped(val)
    }).catch(err => console.error(err))
  }




  return (
    <Fragment>
      {/* <button onClick={() => setCalendly(!calendly)}>Help {user?.name}</button> */}

      {helped? 
        <button disabled={isThereAnotherHelper} onClick={help(false)}>Nevermind <h2> 🛑</h2></button>
        :
        <button disabled={isThereAnotherHelper} onClick={help(true)}>I got you <h2> 👍</h2></button>

      }
      

      {calendly ?

        <div style={{ height: "400px" }}>
          <iframe
            src="https://calendly.com/niko-tzikas/mentoring"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </div>

        : null}
    </Fragment>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => { 
    actions.getAllPosts()
      .then(posts => {
        setPosts(posts.data.reverse())
      })
      .catch(err => console.error(err))      
  }, [])



  return posts.map(eachPost => (
    <Fragment key={Math.random()}>

      <li >
        <img src={eachPost.user?.imageUrl} />
        <div>{eachPost.user?.name} needs you help</div>
        <div>{eachPost.message}</div>
        <div>{eachPost.bounty}</div>
        <EachPost {...eachPost} />

      </li>
      <div>{eachPost.time}</div>

    </Fragment>

  ))
}




const Home = (props) => {

  const changeFruit = () => {

  }

  return (
    <div>
      Home
      <Posts />

    </div>
  )
}

export default Home;



