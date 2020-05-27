import React, { Component } from 'react';
import actions from '../../services/index'
import Axios from 'axios';

class Home extends Component {
  state = {
    drinks: [],
    name: '',
  }
  async componentDidMount() {
    //actions.test()
  }
  searchForDrink = async () => {
    console.log(this)
  
  let result = await Axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.Drink}`)
  console.log(result)
  
  this.setState({ drinks: result.data.drinks})
  }
  showDrinks = () => {
    return this.state.drinks.map(eachDrink => {
      return <li><button onClick = { () =>this.favCocktail(eachDrink)}>Save</button>{eachDrink.strDrink}!</li> 
  
    })
  }
favCocktail = async (drinkName) => {
  //console.log(drinkName)
let favCocktails = this.props.user.favCocktails

  let data = {
    drinkName: drinkName.strDrink
  }
  console.log(data.drinkName)

favCocktails.push(data)
let res = await actions.favorite(data)
console.log(res)

this.props.setUser({
  favCocktails: favCocktails
})
  
}
  setTyping = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }



  render() {
    console.log(this.props)
    return (
      <div>
      <input type = "text" placeholder = "Drink" name = "Drink" onChange={this.setTyping}/>
        <button onClick = {this.searchForDrink}>Search</button>
        {this.showDrinks()}
      </div>
    );
  }
}   

export default Home;
