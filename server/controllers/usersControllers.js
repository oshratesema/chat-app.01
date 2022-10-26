const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { findOne } = require('../models/userModel');

module.exports.register = async (req, res, next) => {
    try{const {username, email, password} = req.body;
    const usernameCheck = await User.findOne({ username });
   if(usernameCheck) 
   return res.json ({msg: 'Username already used', status: false});
   const emailCheck = await User.find({email})
   if(emailCheck) 
   return res.json ({msg: 'Email already used', status: false});
   const hashedPassword = await bcrypt.hash(password, 10)
   const user = await User.create({
   email,
   username,
   password: hashedPassword,
   })
   delete username.password;
   return res.json({status: true, user})
}catch(ex){
    next(ex);
}
};

