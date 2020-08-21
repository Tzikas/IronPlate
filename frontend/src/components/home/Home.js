import React, { Component, useState, useEffect } from 'react';
import actions from '../../api/index'



const Home = (props) => {
  let [fruit, setFruit] = useState('kiwi')

  useEffect(()=>{
    setFruit('passion fruit')
  }, [])

  const changeFruit = () => {
    setFruit("pineapple")
  }

  return( 
    <div>
      Home {fruit}
      <button onClick={changeFruit}>Change Fruit</button>
    </div>
  )
}

export default Home;



