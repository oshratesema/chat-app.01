const Avatars = require('../models/avatarsModel');

const getAvatars = async () => {
    return Avatars.find({});
}

module.exports = {getAvatars};