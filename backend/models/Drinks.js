const mongoose = require('mongoose')
const Schema = mongoose.Schema

const drinksSchema = new Schema(
  {
    drinkName: String
  }
  
);


const Drinks = mongoose.model('Drinks', drinksSchema)


module.exports = Drinks
