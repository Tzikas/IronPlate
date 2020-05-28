import React, { Component } from 'react';
import actions from '../../services/index'
import Axios from 'axios'
import Card from '../Card'
import CocktailLoader from '../CocktailLoader'
class Home extends Component {
  state = {
    drinks: [],
    name: '',
    loading: false,
  }
  async componentDidMount() {
    //actions.test()
  }

  setLoadingToFalse = () => this.setState({loading:false})
                    


  searchForDrink = async () => {
    console.log(this)
  this.setState({loading: true})
  let result = await Axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.Drink}`)
  console.log(result)
  
  this.setState({ drinks: result.data.drinks})
  }
  showDrinks = () => {
    return this.state.drinks.map(eachDrink => {
      return (
          <Card {...eachDrink} />

      )
  
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
        <h1>Welcome to Iron Drinks!</h1>

        <h2>Log in to Search for your Favorite Cocktails!</h2>
        

        {this.state.loading ? 
            <CocktailLoader setLoadingToFalse={this.setLoadingToFalse}/>
          :
          <div className="showDrinks">{this.showDrinks()}</div>
        }
        

      </div>
    );
  }
}   

export default Home;
