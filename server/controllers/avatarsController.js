const Avatar = require("../models/avatarsModel");


module.exports.getAllAvatars = async (req, res, next) => {
    try{
    const avatars = await (await Avatar.find({_id:{$ne:req.params.id}})).select([
   "_id", "url"
    ]);
    return res.json(avatars);
    }catch(ex){
      next(ex);
    }
  }
  
  
