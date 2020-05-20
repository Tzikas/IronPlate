import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import actions from '../../services/index'


class Home extends Component {
  async componentDidMount() {
    //actions.test()
  }
  render() {
    return (
      <div>
      <Link className='quiz' to ='/quiz'>Quiz</Link>
      <Link className='quiz' to ='/definition'>Definition</Link>
    </div>
    );
  }
}

export default Home;
