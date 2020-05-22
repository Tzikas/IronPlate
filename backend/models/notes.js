const { Schema, model } = require('mongoose');


const noteSchema = new Schema(
  {
    question: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const note = model('note', noteSchema);
module.exports = note