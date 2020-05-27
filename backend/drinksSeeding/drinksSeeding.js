const Axios =  require('axios')
const Drinks = require("../models/Drinks")


async function seedDatabase(){
 let res = await Axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=A1`)
console.log(res.data)

let drink = {
    drinkName: res.data.drinks[0].strDrink
}
console.log(drink.drinkName)
Drinks.findOne({drinkName: drink.drinkName}).then((result) => {
    console.log(result)
    
    if(result) {
        console.log(`this drink exists called ${drink.drinkName}`)
    } else {
        Drinks.create(drink)
        console.log(`i added drink ${drink.drinkName} to database`)
    }
})
    
   // console.log(result.data)

}

module.exports = seedDatabase

