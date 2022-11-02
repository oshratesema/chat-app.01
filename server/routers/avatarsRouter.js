const {getAllAvatars} = require('../controllers/avatarsController')

const router = require("express").Router();

router.get('/getAllAvatars', getAllAvatars)

module.exports = router;