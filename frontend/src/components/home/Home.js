import React, { Component } from 'react';
import actions from '../../services/index'
import Axios from 'axios';


class Home extends Component {
  state = {
    drinks: [],
  }
  async componentDidMount() {
    //actions.test()
  }
  searchForDrink = async () => {
   let result = await Axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
  console.log(result)
  this.setState({ drinks: result.data.drinks})
  }
  showDrinks = () => {
    return this.state.drinks.map(eachDrink => {
      return <li>{eachDrink.strDrink}!</li> 
    })
  }
  render() {
    console.log(this)
    return (
      <div>
        <button onClick = {this.searchForDrink}>Search</button>
        {this.showDrinks()}
      </div>
    );
  }
}   

export default Home;
