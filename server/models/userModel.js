const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        required:true,
        max: 50,
    },
    password:{
        type: Number,
        required:true,
        min: 8,
        max: 50,
},
isAvatarImageSet: {
    type: Boolean,
    default: false
},
avatarImage:{
    type:String,
    default:''
}
})

module.exports = mongoose.model('users', userSchema);