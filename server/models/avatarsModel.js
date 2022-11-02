const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({
    url: String
})

module.exports = mongoose.model("avatars",avatarSchema );