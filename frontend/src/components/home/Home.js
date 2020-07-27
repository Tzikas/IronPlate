import React, { Component, useState, useEffect } from 'react';
import actions from '../../services/index'


// class Home extends Component {

//   state = {
//     fruit: ''
//   }

//   async componentDidMount() { //UseEffect 
//     console.log("Home mounted")
//     this.setState({ 
//       fruit:'banana'
//     })
//   }
//   render() {
//     return (
//       <div>
//         Home {this.state.fruit}
//       </div>
//     );
//   }
// }


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



