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
  Home
  <Link to ='/quiz'>Quiz</Link>
    </div>
    );
  }
}

export default Home;
