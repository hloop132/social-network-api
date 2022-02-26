const { Schema, model } = require("mongoose");

//email regex
const ValidateEmail = function (email) {
  let emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return emailRegex.test(email);
};
//user types 
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trimmed: "",
    },
    //email types
    email: {
      type: String,
      trimmed: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: [ValidateEmail, "enter a valid email"],
      //literally matching my email regex
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "enter a valid email",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
    return `${this.friend}`;
});

const User = model("user", userSchema);

module.exports = User;
