const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: String,
    name: String,
    googleId: String,
    imageUrl: String,
    calendly: { type: String, default: "https://calendly.com/ Click here to set your calendly!"},
    posts: [{ type : Schema.Types.ObjectId, ref: 'Posts' }],
    points: {
      type: Number, default: 2500
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
