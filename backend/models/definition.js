const { Schema, model } = require('mongoose');


const definitionSchema = new Schema(
  {
    word: String,
    definition:String,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const definition = model('definition', definitionSchema);
module.exports = definition