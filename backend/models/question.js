const { Schema, model } = require('mongoose');


const questionSchema = new Schema(
  {
    question: String,
    choices: Array,
    answer: String,
    category: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const question = model('question', questionSchema);
module.exports = question