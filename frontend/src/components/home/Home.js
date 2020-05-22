import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Card from '../cards'
// import actions from '../../services/index'


class Home extends Component {
  async componentDidMount() {
    //actions.test()
  }
  render() {
    return (
      <div className="home">
      <Link className='quiz' to ='/quiz'><Card name="JavaScript Quiz"
      image="/images/js.png"></Card></Link>
      <Link className='quiz' to ='/definition'><Card name="Definitions"
      image="/images/images.jpg"></Card></Link>
      <Link className='quiz' to ='/note'><Card name="Take Notes"
      image='/images/pen.jpg'></Card></Link>
    </div>
    );
  }
}

export default Home;
