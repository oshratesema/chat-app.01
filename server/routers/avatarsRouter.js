const {getAllAvatars} = require('../controllers/avatarsController')

const router = require("express").Router();

router.get('/allAvatars', getAllAvatars)

module.exports = router;