import React, { Fragment, Component, useState, useEffect } from 'react';
import actions from '../../api/index'

const Calendly = ( post ) => {
  let [calendly, setCalendly] = useState(false)
  let [helped, setHelped] = useState(false)

  const help = (val) => (event) => {
    actions.helpUser({post, help:val}).then(res => {
      setHelped(val)
    }).catch(err => console.error(err))
  }




  return (
    <Fragment>
      {/* <button onClick={() => setCalendly(!calendly)}>Help {user?.name}</button> */}
      {helped? 
        <button onClick={help(false)}>Nevermind</button>
        :
        <button onClick={help(true)}>I got you</button>

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
  const [posts, setPosts] = useState([
    // { message: 'I need help', user: 'Val', time: '30 seconds ago' },
    // { message: 'Please we are stuck', user: 'Roy', time: '1 hour ago' },
    // { message: 'Need someone here', user: 'Carlos', time: '2 hours 10 min ago' }
  ])
  useEffect(() => { 
    actions.getAllPosts()
      .then(posts => {
        console.log(posts)
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

        <Calendly {...eachPost} />

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



