const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const postSchema = new Schema(
  {
    message: String,
    user: { type : Schema.Types.ObjectId, ref: 'User' },
    helper: { type : Schema.Types.ObjectId, ref: 'User'},
    bounty: { type: Number, default: 500},
    resolved: {type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = model("Post", postSchema);
