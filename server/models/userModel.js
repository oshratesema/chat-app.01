const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   username: String,
   email: String,
   password: String,
   isAvatarImageSet: {
     type: Boolean,
     default: false,
   },
   avatarImage: {
     type: String,
     default: "",
   }
  });
  module.exports = mongoose.model("Users", userSchema);
  
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   max: 50,
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   min: 8,
  // },